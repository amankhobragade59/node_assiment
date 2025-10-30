import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = mongoose.Schema({
    firstName :{
        type:String,
        required:true,
    },
    lastName :{
        type:String,
        required:true,
    },
    email :{
        type:String,
        unique:true,
        required:true,
    },
    password :{
        type:String,
        required:true,
    },
});

userSchema.pre('save',async function (next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
});

const User = mongoose.model('users',userSchema);

export default User;