import React, { useState } from "react";
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { Link, useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
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
        <div className="d-flex justify-content-center align-items-center " style={{position: "fixed", top:"0",left: "0",width: "100%",height: "100vh",backdropFilter:" blur(10px)"}} >
            
            <div className="position-relative p-5">
                        <svg onClick={()=>{navigate("/")}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="cross_icon bi bi-x-lg position-absolute top-0 end-0" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                        </svg>
                <form className="glass p-4" onSubmit={OnSubmit}  style={{alignItems:'center', justifyContent: 'center', display:'grid'}}>

                    <div class="mb-3">
                        <p className="fs-1">Login Page</p>
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

                    <button type="submit" class="btn btn-primary">Login</button>

                    <div className="d-flex mt-2 gap-2">
                        <p>Don't have an Account ?</p>
                        <Link to={"/register"}>Register</Link>
                    </div>
                </form>
            </div>

        </div>

    )
}