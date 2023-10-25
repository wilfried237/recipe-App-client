import React, { useState } from "react";
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { useNavigate } from "react-router-dom";
// import {useForm} from 'react-hook-form';
// import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

 export default function LoginPage(){
    const [token,setToken] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const [_, setCookies] = useCookies(["access_token","access_ID"]);

    const OnSubmit = async (event)=>{
        event.preventDefault();
        try{
          const userRespond = await axios.post(`${process.env.REACT_APP_API_PATH}/auth/login`,{username:userName, password:password});
          if(userRespond.data.flag === false){
            alert(userRespond.data.message);
          }
          else{
            alert(userRespond.data.message);
            setToken(userRespond.data.token);
            window.localStorage.setItem('User', userRespond.data.userID)
            setCookies("access_token", userRespond.data.token)
            setCookies("access_ID",userRespond.data.userID)
            navigate("/");
          }

        }
        catch(err){
            console.error(err);
        }
    }

    return(
<form onSubmit={OnSubmit}  style={{width:'100%', alignItems:'center', justifyContent: 'center', display:'grid'}}>

        <div class="mb-3">
            <h1>Login Page</h1>
            <label for="exampleInputEmail1" class="form-label">UserName</label>
            <input onChange={(e)=>{setUserName(e.target.value)}} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>

        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input onChange={(e)=>{setPassword(e.target.value)}} type="password" class="form-control" id="exampleInputPassword1" />
        </div>

        <div className="mb-3">
            <a onClick={()=>{navigate('/reset-password')}} href='#' > Forget Password </a>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
</form>
    )
}