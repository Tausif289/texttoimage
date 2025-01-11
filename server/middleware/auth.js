import jwt from "jsonwebtoken";


const userAuth=async(req,res,next)=>{
    const {token}=req.headers;

    if(!token){
        return(
            res.json({
                success:false,
                message:"not authorized login again"
            })
        )
    }

    try{
        const tokendecode=jwt.verify(token,process.env.JWT_SECRET);
        if(tokendecode.id){
            req.body.userId=tokendecode.id;
        }else{
            res.json({
                success:false,
                message:"not authorized login again"
            })
        }
        next();
    }catch(err){
        res.json({
            success:false,
            message:err.message
        })
    }
}

export default userAuth;