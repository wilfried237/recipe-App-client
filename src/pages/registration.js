import axios from 'axios'
import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

export default function Registration(){

    const navigate = useNavigate();

    const schema = yup.object().shape({
        username :  yup.string().required().max(11).min(5),
        email:      yup.string().email().required(),
        password:   yup.string().max(32).min(8).required(),
        });

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: yupResolver(schema),
    });

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
        <div className="d-flex justify-content-center align-items-center " style={{position: "fixed", top:"0",left: "0",width: "100%",height: "100vh",backdropFilter:" blur(10px)"}}>
            <form onSubmit={ handleSubmit(OnSubmit)} style={{}} className='glass position-relative p-5'>
                    <svg onClick={()=>{navigate("/")}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="cross_icon bi bi-x-lg position-absolute top-0 end-0" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                    <p className='fs-1'>Registration Page</p>
                    <div class="mb-3">
                        <label  for="UserName" className="form-label">UserName</label>
                        <input {...register("username")}  type="text" className="form-control" id="UserName" required/>
                        <p> { errors.username?.message }</p>
                    </div>
                    <div className="mb-3">
                        <label for="Email" className="form-label"> Email</label>
                        <input {...register("email")} type="text" className="form-control" id="Email" required/>
                        <p> { errors.email?.message} </p>
                    </div>
                    <div class="mb-3">
                        <label for="Password" className="form-label">Password</label>
                        <input {...register("password")} type="password" className="form-control" id="Password" required/>
                        <p> { errors.password?.message } </p>
                    </div>

                    <div className='d-flex justify-content-center mt-3'>
                        <button type="submit" className="btn btn-primary btn-center">Register</button>
                    </div>
                    
            </form>
        </div>  
    )
}