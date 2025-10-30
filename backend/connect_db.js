import mongoose  from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

export const connectDb = ()=>{
    const url = process.env.MONGODB_URL;
    mongoose.connect(url).then(()=>{
        console.log("database connected");
    }).catch((error)=>{
        console.error("error in connection ",error);
    })
}