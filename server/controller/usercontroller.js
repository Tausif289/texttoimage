import usermodel from "../model/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import Razorpay from 'razorpay';
import transactionmodel from "../model/transactionmodel.js";


console.log("Key ID ===>", JSON.stringify(process.env.RAZORPAY_KEY_ID));
console.log("Key SECRET ===>", JSON.stringify(process.env.RAZORPAY_KEY_SECRET));
console.log("curenccy ===>", JSON.stringify(process.env.CURRENCY));
//login user
const loginuser= async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "user dose not exists",
      });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.json({
        success: false,
        message: "invalid password",
      });
    }
    const token = createtoken(user._id);
    res.json({
      success: true,
      token,
      user:{name:user.name}
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

//create token
const createtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//register user
const registeruser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    if(!name || !email || !password){
        return (
            res.json({
            success:false,
            message:"missing details"
         }))
    }
    const exists = await usermodel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "user already exists",
      });
    }
    // validating email format & password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter valid message",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }
    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newuser = new usermodel({
      name: name,
      email: email,
      password: hashedpassword,
    });

    const user = await newuser.save();
    const token = createtoken(user._id);
    res.json({
      success: true,
      token,
      user:{name:user.name}
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error",
    });
  }
};


//user credit
const usercredits=async(req,res)=>{
  try{
    const {userId}=req.body;
    if (!userId) {
      return res.status(400).json({
          success: false,
          message: "User ID is required.",
      });
  }
    const user=await usermodel.findById(userId);
     // Check if user exists
     if (!user) {
      return res.status(404).json({
          success: false,
          message: "User not found.",
      });
  }

    res.json({
      success: true,
      credits:user.creditBalance,
      user:{
        name:user.name
      }
    });
   
  }catch(err){
    console.log(err);
    res.json({
      success: false,
      message: "Error",
    });
  }
}

console.log("Razorpay Key:", process.env.RAZORPAY_KEY_ID);
console.log("Razorpay Secret:", process.env.RAZORPAY_KEY_SECRET);

//for payment
const paymentrazorpay=async(req,res)=>{
  try{
    const {userId,planId}=req.body;
    if(!userId ||!planId){
      return res.json({
        success:false,
        message:"missing Details"
      })
    }
    const user=await usermodel.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    let credits, plan,date,amount

    switch (planId) {
      case 'Basic':
         plan='Basic',
         credits=100,
         amount=10
        break;

      case 'Advanced':
          plan='Advanced',
          credits=500,
          amount=50
         break;

      case 'Business':
         plan='Business',
         credits=5000,
         amount=250
        break;  
    
      default:
        return res.json({
          success:false,
          message:'plan not found'
        })

    }

    date=Date.now();
    const receipt = `${userId}-${plan}-${date}`;
    const transactionData={
      userId,plan,amount,credits,date
    }

    const newTransaction= await transactionmodel.create(transactionData);
    const options={
      amount:amount*100,
      currency:process.env.CURRENCY,
      receipt:newTransaction._id
    }

    await razorpayInstance.orders.create(options,(error,order)=>{
      if(error){
        console.log(error);
        return res.json({
          success:false,
          message:error.message
        })
      }
      res.json({
        success:true,
        order
      })
    });

  }catch(err){
    console.log(err)
    res.json({
      success:false,
      message:err.message
    })
  }
}
const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//verify payment

const verifyrazorpay=async(req,res)=>{
  try{
    const {razorpay_order_id}=req.body;
    const razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const orderinfo=await razorpayInstance.orders.fetch(razorpay_order_id)
    if(orderinfo.status==='paid'){
      const transactionData=await transactionmodel.findById(orderinfo.receipt)
      if(transactionData.payment){
        res.json({
          success:false,
          message:"payment failed"
        })
      }
      const userdata=await usermodel.findById(transactionData.userId)
      const creditBalance=userdata.creditBalance+transactionData.credits;
      await usermodel.findByIdAndUpdate(userdata._id,{creditBalance})
      await transactionmodel.findByIdAndUpdate(transactionData._id,{payment:true})
      res.json({
        success:true,
        message:"credits added"
      })
    }else{
      res.json({
        success:false,
        message:"payment failed"
      })
    }
  }catch(err){
    console.log(err)
    res.json({
      success:false,
      message:err.message
    })
  }
}


export { loginuser, registeruser,usercredits,paymentrazorpay,verifyrazorpay };
