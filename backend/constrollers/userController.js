import User from '../models/usermodel.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
dotenv.config();

export const getUser = async (req,res)=>{
    try {
        const id = req.params.id;
        const user= await User.findById(id).select("-password");
        res.status(200).json({user});
    } catch (error) {
        console.log('error in getUser ',error.message);
        return res.status(500).json({message:error.message});
    }
}

export const forgetPassword = async (req,res)=>{
    try {
        const{email} = req.body;
        if(!email){
            return res.status(400).json({message:"please provide email"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not available"});
        }
        const secret = process.env.SECRET_KEY;
        const token = jwt.sign({email},secret,{expiresIn:"5m"});

        const transporter = nodemailer.createTransport({
            service:"gmail",
            secure:true,
            auth:{
                user:process.env.MY_GMAIL,
                pass:process.env.MY_PASSWORD
            }
        });

        const receiver = {
            from : "aman13chan@gmail.com",
            to:email,
            subject :"Reset Password",
            text : `Click to generate new password ${process.env.CLIENT_URL}/reset-password/${token}`,
        }

        await transporter.sendMail(receiver);

        res.status(200).json({message:"Password reset link sent to your mail"});

    } catch (error) {
        console.log('error in forgetPassword ',error.message);
        return res.status(500).json({message:error.message});
    }
}

export const resetPassword = async(req,res)=>{
    try {
        const {token} = req.params;
        const {password} = req.body;
        
        if(!password){
            return res.status(400).json({message:"Please provide password"});
        }

        const decode = jwt.verify(token,process.env.SECRET_KEY);

        const user = await User.findOne({email:decode.email});
        user.password = password;
        await user.save();
        res.status(200).json({user,message:"password reset successfull"});

    } catch (error) {
        console.log('error in reset password ',error.message);
        return res.status(500).json({message:error.message});
    }
}
