import { useState } from "react";
import {useParams} from 'react-router-dom'
import axios from 'axios'

export default function ResetPassword(){
    const {token} = useParams();
    const [password,setPassword] = useState("");
    const [msg,setMsg] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const handleSubmit= async(e)=>{
        console.log(token);
        e.preventDefault();
        if(password !== confirmPassword){
            setMsg("pasword not match");
        }
        try {
            const cleanToken = decodeURIComponent(token);
            const res = await axios.post(`http://localhost:3000/user/reset-password/${cleanToken}`,{password})
            setMsg(res.data.message);
        } catch (error) {
            setMsg("error setting password");
        }
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                <input type="text" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required />
                <button type="submit">update password</button>
                <p>{msg}</p>
            </form>
        </div>
    )
}