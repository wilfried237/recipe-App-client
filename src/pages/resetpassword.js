import React from "react";
import {useForm} from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'; 
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const ResetPassword = ()=>{
    const navigate = useNavigate();

        const schema = yup.object().shape({
        username :  yup.string().required().max(11).min(5),
        password:   yup.string().max(32).min(8).required(),
        });

    const {register, formState:{errors}, handleSubmit , reset} = useForm({
        resolver: yupResolver(schema)
    });

    const submit = async (data)  =>{
       const response = await axios.put(`${process.env.REACT_APP_API_PATH}/auth/resetPassword`, {userName: data.username, newPassword: data.password});
    //    console.log(response.data);
       if(response.data.flag === false){
         alert(response.data.message);
       }
       else{
        alert(response.data.message);
        reset();
        navigate('/auth');
       }
    }

    return(
        <form onSubmit={handleSubmit(submit)} className="container mt-5">
            <div>
                <h1 className="text-center">Reset Password </h1>
                <div className="mb-3">
                    <label for="user" className="form-label">User</label>
                    <input {...register("username")} type="text" className="form-control" id="user" required/>
                    <p> { errors.username?.message } </p>
                </div>
                <div className="mb-3">
                    <label for="newPassword" className="form-label">Password</label>
                    <input {...register("password")} type="password" className="form-control" id="newPassword" required/>
                    <p> { errors.password?.message } </p>
                </div>
            </div>
            <button className="btn btn-primary" type="submit" > Reset </button>
        </form>

    );
}
export default ResetPassword