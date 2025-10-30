import express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import {connectDb} from './connect_db.js'
import cors from 'cors'
dotenv.config();
const app = express();
const myPort = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST"],
    credentials:true
}));

app.use('/auth',authRoute);
app.use('/user',userRoute);
app.listen(myPort,()=>{
    console.log(`server at ${myPort}`);
    connectDb();
})