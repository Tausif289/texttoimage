import express from 'express';
import cors from 'cors'
import connectToDatabase from './config/mongodb.js';
import 'dotenv/config'
import userrouter from './routes/userroute.js';
import imagerouter from './routes/imageroute.js';



const port=process.env.PORT||4000;
const app=express()



app.use(express.json())
app.use(cors());

//Db connection
connectToDatabase();

app.use('/api/user',userrouter);
app.use('/api/image',imagerouter);

app.get("/",(req,res)=>{
    res.send("working")
});

app.listen(port,()=>{
    console.log("server is running on port ",port)
});