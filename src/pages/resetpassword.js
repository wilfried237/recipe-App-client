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
        navigate('/Login');
       }
    }

    return(
        <div class="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
            <form onSubmit={handleSubmit(submit)} style={{boxShadow:"0 2px 4px rgba(0,0,0,0.2)", borderRadius: "2%"}} className="d-flex flex-column justify-content-center align-items-center my-auto p-5 ">
                <p className="text-center mb-5 fs-2">Reset Account Password </p>
                <p className="text-center text-muted mb-5"> Enter a new password for lorem</p>

                <div className="mw-100 justify-content-center align-items-center">
                    <input className="form-control" {...register("username")} type="text" placeholder="UserName" required/>
                    <p> { errors.username?.message } </p>
                </div>

                <div className="mw-100 center" >
                    <input className="form-control" {...register("password")} type="password" placeholder="Password" required/>
                    <p> { errors.password?.message } </p>
                </div>
                <button className="btn btn-warning text-white" type="submit" > Reset </button>
            </form>
        </div>


    );
}
export default ResetPassword