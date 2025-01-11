import express from "express";
import { loginuser,paymentrazorpay,registeruser, usercredits, verifyrazorpay } from "../controller/usercontroller.js";
import userAuth from "../middleware/auth.js";

const userrouter=express.Router();

//user api endpoint
userrouter.post("/register", registeruser);
userrouter.post("/login", loginuser);
userrouter.get('/credits',userAuth,usercredits);
userrouter.post("/pay-razor",userAuth,paymentrazorpay );
userrouter.post("/verify-razor",verifyrazorpay);

export default userrouter;

//http://localhost:4000/api/user/register