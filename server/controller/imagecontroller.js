import usermodel from "../model/usermodel.js";
import formData from 'form-data'
import axios from 'axios'

export const generateimage=async(req,res)=>{
    try{
       const {userId,prompt}=req.body;
       const user=await usermodel.findById(userId);
       if(!user||!prompt){
          return res.json({
            success:false,
            message:"Missing userId or prompt"
          })
       }
       if(user.creditBalance===0 ){
        return res.json({
            success:false,
            message:"no more credit",
            creditBalance:user.creditBalance
          })
       }
       const formdata=new formData()
       formdata.append('prompt',prompt);
       const {data}=await axios.post('https://clipdrop-api.co/text-to-image/v1',formdata,{
        headers: {
            //...formdata.getHeaders(),
            'x-api-key': process.env.CLIPDROP_API,
          },
          responseType:'arraybuffer'
       });

       const base64image=Buffer.from(data,'binary').toString('base64');
       const resultimage=`data:image/png;base64,${base64image}`;
       await usermodel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1 });
       res.json({
        success: true,
        message: "image generated",
        creditBalance:user.creditBalance-1,
        resultimage 
      });


    }catch(err){
        console.log(err);
        res.json({
            success: false,
            message: "Error generating image",
            error: err.message,
          });
    }
}