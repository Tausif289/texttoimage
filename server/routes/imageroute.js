import express from "express";
import { generateimage } from "../controller/imagecontroller.js";
import userAuth from "../middleware/auth.js";

const imagerouter=express.Router();

//user api endpoint
imagerouter.post("/generate-image", userAuth,generateimage);

export default imagerouter;