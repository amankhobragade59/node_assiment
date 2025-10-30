import User from '../models/usermodel.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config();

export const signup = async (req,res)=>{
    try {
        const {firstName,lastName,email,password} = req.body;

        if(!firstName|| !lastName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const existUser = await User.findOne({email});

        if(existUser){
            return res.status(400).json({message:"User already exists"});
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password
        });
        
        await newUser.save();
        res.status(201).json({newUser,message:"User registration successfull"});
    } catch (error) {
        console.log('error in signup ',error.message);
        return res.status(500).json({message:error.message});
    }
}

export const login = async (req,res)=>{
    try {
        const secret = process.env.SECRET_KEY;
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"User not exists"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid password"});
        }

        const token = jwt.sign({userId:user._id},secret,{expiresIn:"1h"});
        res.status(200).json({message:"Login successfull",user,token});

    } catch (error) {
        console.log('error in login ',error.message);
        return res.status(500).json({message:error.message});
    }
}
