import axios from 'axios'
import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField'
import * as yup from 'yup';
import Button from '@mui/material/Button';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useSnackbar } from '../App';
import './css/login.css';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';

export default function Registration({setBackdropLogin,backdropLogin,setBackdropRegistration}){
    const { snackBarInfo, setSnackBarInfo } = useSnackbar(); 
    const [loading , setLoading] = useState(false);
    
    const schema = yup.object().shape({
        username: yup
          .string()
          .required('Username is required')
          .max(11, 'Username must be at most 11 characters long')
          .min(5, 'Username must be at least 5 characters long'),
        email: yup
          .string()
          .email('Invalid email address')
          .required('Email is required'),
        password: yup
          .string()
          .max(32, 'Password must be at most 32 characters long')
          .min(8, 'Password must be at least 8 characters long')
          .required('Password is required'),
      });

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema),
    });

    function handleMoveLogin(){
        setBackdropRegistration(false);
        setTimeout(() => {
            setBackdropLogin(true);
        }, 100);
    }
    
    const GoogleAuth = async(data)=>{
        setLoading(true);
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_PATH}/auth/register`, {
                username: data.name,
                email: data.email,
                typeRegister: "googleAuth"
            });
            
            if(response.data.flag === false){
                setSnackBarInfo({ 
                    ...snackBarInfo, 
                    message: response.data.message, 
                    open: true, 
                    severity: "error" 
                });
            } else {
                setSnackBarInfo({ 
                    ...snackBarInfo, 
                    message: response.data.message, 
                    open: true, 
                    severity: "success" 
                });
                reset();
                handleMoveLogin();
            }
        } catch(err){
            console.error("Google Registration Error:", err);
            setSnackBarInfo({ 
                ...snackBarInfo, 
                message: err.response?.data?.message || err.message || "Registration failed", 
                open: true, 
                severity: "error" 
            });
        } finally {
            setLoading(false);
        }
    }

    const OnSubmit = async (data)=>{
        setLoading(true);
        try{
            const response = await axios.post(`${process.env.REACT_APP_API_PATH}/auth/register`, {
                ...data, 
                typeRegister: "normal"
            });
            
            if(response.data.flag === false){
                setSnackBarInfo({ 
                    ...snackBarInfo, 
                    message: response.data.message, 
                    open: true, 
                    severity: "error" 
                });
            } else {
                setSnackBarInfo({ 
                    ...snackBarInfo, 
                    message: response.data.message, 
                    open: true, 
                    severity: "success" 
                });
                reset();
                handleMoveLogin();
            }
        } catch(err){
            console.error("Registration Error:", err);
            setSnackBarInfo({ 
                ...snackBarInfo, 
                message: err.response?.data?.message || err.message || "Registration failed", 
                open: true, 
                severity: "error" 
            });
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="d-flex justify-content-center align-items-center">      
            <Paper style={{ width: "420px" }}  elevation={6} >
                <form onSubmit={ handleSubmit(OnSubmit)}>
                    <div className="p-5 d-flex flex-column gap-3">
                        
                        <div>
                            <p className="fs-1 fw-medium">REGISTER</p>
                            <TextField
                                id="username-input"
                                label="UserName"
                                {...register("username")}
                                fullWidth
                                sx={{
                                    borderColor:"#F1F1F1"
                                }}
                            />
                            {errors.username?.message && (
                                <FormHelperText className="text-danger">
                                    {errors.username?.message}
                                </FormHelperText>
                            )}
                        </div>
                        
                        <div>
                            <TextField
                                id="email-input"
                                label="Email"
                                {...register("email")}
                                fullWidth
                                sx={{
                                    borderColor:"#F1F1F1"
                                }}
                            />
                            {errors.email?.message && (
                                <FormHelperText className="text-danger">
                                    {errors.email?.message}
                                </FormHelperText>
                            )}
                        </div>
                        
                        <div>      
                            <TextField
                                id="password-input"
                                label="Password"
                                {...register("password")}
                                type='password'
                                fullWidth
                                sx={{
                                    borderColor:"#F1F1F1",
                                }}
                            />
                            {errors.password?.message && (
                                <FormHelperText className="text-danger">
                                    {errors.password?.message}
                                </FormHelperText>
                            )}
                        </div>
                        
                        <div>
                            <p className="m-0 w-100 text-center">
                                Register with
                            </p>
                            <div className="d-flex justify-content-evenly align-items-center mt-1">
                                {loading ? (
                                    <CircularProgress size={30} color="inherit" />
                                ) : (
                                    <GoogleLogin
                                        onSuccess={async (credentialResponse) => {
                                            const UserDetails = jwtDecode(credentialResponse.credential);
                                            await GoogleAuth(UserDetails);
                                        }}
                                        onError={() => {
                                            setSnackBarInfo({ 
                                                ...snackBarInfo, 
                                                message: "Registration Failed", 
                                                open: true, 
                                                severity: "error" 
                                            });
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        
                        <div className='d-flex justify-content-center'>
                            <Button  
                                variant="contained" 
                                style={{backgroundColor:"#FF642F",color:"white"}} 
                                type="submit" 
                                className="py-2" 
                                fullWidth
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="d-flex flex-row justify-content-center">
                                        <CircularProgress color="inherit"/>
                                    </div> 
                                ) : "Register"}
                            </Button>
                        </div>                        
                        
                        <div className='d-flex gap-2 justify-content-center'>
                            <p>Already have an account ? </p>
                            <a 
                                onClick={()=>{handleMoveLogin()}} 
                                className='text-effect'
                                style={{ cursor: "pointer" }}
                            >
                                Login
                            </a>
                        </div>
                    </div>
                </form>
            </Paper> 
        </div>
    )
}