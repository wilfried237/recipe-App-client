import axios from 'axios'
import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField'
import * as yup from 'yup';
import Button from '@mui/material/Button';

export default function Registration({setBackdropLogin,backdropLogin,setBackdropRegistration}){

    const schema = yup.object().shape({
        username :  yup.string().required().max(11).min(5),
        email:      yup.string().email().required(),
        password:   yup.string().max(32).min(8).required(),
        });

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema),
    });


    function handleMoveLogin(){
        setBackdropLogin(true);
        setBackdropRegistration(false);
    }

    const OnSubmit = async (data)=>{

        try{
            const response = await axios.post(`${process.env.REACT_APP_API_PATH}/auth/register`, data);
            if(response.data.flag === false){
                alert(response.data.message);
            }
            else{
                alert(response.data.message);
                reset();
            }
        }
        catch(err){
            console.error(err)
        }
    }

    return(
        <Paper elevation={6} >
                <form style={{width:"420px"}} onSubmit={ handleSubmit(OnSubmit)} className='container'>
                    <div className="p-5 d-flex flex-column gap-3">
                        
                        <div>
                        <p className="fs-1 fw-medium">REGISTER</p>
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
                            
                            id="exampleInput"
                            label="email"
                            {...register("email")}
                            fullWidth
                            type="email"
                            sx={{
                                borderColor:"#F1F1F1"
                            }}
                            />
                            <p> { errors.email?.message} </p>
                        </div>
                        <div>      
                            <TextField
                            
                            id="exampleInput"
                            label="password"
                            {...register("password")}
                            type='password'
                            fullWidth
                            sx={{
                                borderColor:"#F1F1F1",
                            }}
                            />
                            <p> { errors.password?.message } </p>
                        </div>
                        <div>
                            <p class="m-0 w-100 text-center">
                                Register with
                            </p>
                            <div class="d-flex justify-content-evenly align-items-center">
                                <img width="48" height="48" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>
                                <text class="fw-medium fs-5">Or</text>
                                <img width="48" height="48" src="https://img.icons8.com/color/48/facebook-new.png" alt="facebook-new"/>
                            </div>
                        </div>

                        <div className='d-flex justify-content-center'>
                        <Button  variant="contained" style={{backgroundColor:"#FF642F",color:"white"}} type="submit" className="py-2" fullWidth>
                        Register
                        </Button>
                        </div>
                        
                        <div className='d-flex gap-2 justify-content-center'>
                            <p>Already have an account ? </p>
                            <a onClick={()=>{handleMoveLogin()}}>Login</a>
                        </div>
                    </div>
                </form>
        </Paper>  
    )
}