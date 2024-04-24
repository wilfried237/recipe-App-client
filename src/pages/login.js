import React, { useState } from "react";
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { Link, useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
import Registration from "./registration";
import Dialog from '@mui/material/Dialog';
import { useSnackbar } from "../App";

 export default function LoginPage({setBackdropLogin,backdropLogin}){
    const { snackBarInfo, setSnackBarInfo } = useSnackbar();
    const [token,setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [backdropRegistration, setBackdropRegistration]=  useState(false);
    const [cookies, setCookies] = useCookies(["access_token","access_ID"]);

    const schema = yup.object().shape({
        username :  yup.string().required().max(11).min(5),
        password:   yup.string().max(32).min(8).required(),
        });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const OnSubmit = async (data)=>{
        setLoading(true);
        try{
          const userRespond = await axios.post(`${process.env.REACT_APP_API_PATH}/auth/login`,{username:data.username, password:data.password});
          
          if(userRespond.data.flag === false){
            setSnackBarInfo({ ...snackBarInfo, message: userRespond.data.message, open: true, severity: "error" });
          }
          else{
            setSnackBarInfo({ ...snackBarInfo, message: userRespond.data.message, open: true, severity: "success" });
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
        finally{
            setLoading(false);
        }
    }

    function handleOpenRgtnBackDrope(){
        setBackdropRegistration(true);
        setBackdropLogin(false);
    }

    return(
        <div className="d-flex justify-content-center align-items-center ">
            
            <Paper style={{width:"420px"}} elevation={6}>
                <form className="container" onSubmit={handleSubmit(OnSubmit)}>
                    <div className="p-5 d-flex flex-column gap-3">
                    <div>
                        <p className="fs-1 fw-medium">LOGIN</p>
                        <TextField
                            
                            id="exampleInput"
                            label="UserName"
                            {...register("username")}
                            fullWidth
                            sx={{
                                borderColor:"#F1F1F1"
                            }}
                        />
                    </div>

                    <div>
                        <TextField
                            id="exampleInputPassword"
                            label="Password"
                            type="password"
                            {...register("password")}
                            fullWidth
                        />
                    </div>

                    <div className="d-flex justify-content-end">
                        <a style={{color:"#FF642F",textDecoration:"none"}} onClick={()=>{navigate('/reset-password')}} href='#' > Forget Password </a>
                    </div>

                    <Button  variant="contained" style={{backgroundColor:"#FF642F",color:"white"}} type="submit" className="py-2" disabled={loading}>
                        {loading ? 
                        <div className="d-flex flex-row justify-content-center">
                            <CircularProgress color="inherit"/>
                        </div> : "Login"}
                    </Button>
                    
                    <p className="text-center">Or login with</p>
                    <div class="d-flex justify-content-evenly align-items-center">
                            <img width="48" height="48" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>
                            <text class="fw-medium fs-5">Or</text>
                            <img width="48" height="48" src="https://img.icons8.com/color/48/facebook-new.png" alt="facebook-new"/>
                    </div>
                    <div className="d-flex mt-2 gap-2 justify-content-center">
                        <p>Don't have an Account ?</p>
                        <a onClick={()=>{handleOpenRgtnBackDrope();}}>Register</a>
                        <Dialog
                          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: backdropRegistration && " blur(10px)" }}
                          open={backdropRegistration}
                          onClose={() => { setBackdropRegistration(false) }}
                          keepMounted
                        >
                            <Registration backdropRegistration={backdropRegistration} setBackdropRegistration={setBackdropRegistration} backdropLogin={backdropLogin} setBackdropLogin={setBackdropLogin}/>
                        </Dialog>
                    </div>
                    </div>
                </form>
            </Paper>

        </div>

    )
}