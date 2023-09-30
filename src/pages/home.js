import axios from "axios";
import React, { useState } from "react";
import RecipesFormat from "../components/Recipes";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const fetchData = async()=>{
    try{
       const response = await axios.get(`${process.env.REACT_APP_API_PATH}/recipes`);
       return response.data
    }catch(err){
        console.error(err);
    }
}

export default function Home(){
    const [cookies] = useCookies();
    const [userSavedRecipe, setUserSavedRecipe] = useState([]);
    const navigate = useNavigate();
    const {data,isError,isLoading} = useQuery(['recipes'],fetchData)
    
    const handleSavedRecipes = async (id)=>{
        try{
            if(cookies.access_token){
                await axios.put(`${process.env.REACT_APP_API_PATH}/recipes/savedRecipe`,{userID:cookies.access_ID,recipeID:id},{headers:{Authorization: cookies.access_token}});
                setUserSavedRecipe([...userSavedRecipe,id]);
            }else{
                 alert("you need to sigIn or signUp");
                 navigate('/auth');
            }
        }
        catch(err){
            console.error(err)
        }
    }

    if(isError){
        return <div> error {isError} </div>
    }

    if(isLoading){
        return <div> data is loading </div>
    }

    const fetchUserSavedRecipe = async ()=>{
        try{
            if(cookies.access_token){
                const response = await axios.get(`${process.env.REACT_APP_API_PATH}/recipes/savedRecipe/${cookies.access_ID}`,{headers:{Authorization: cookies.access_token}});
                setUserSavedRecipe(response.data);
            }
        }catch(err){
            console.error(err);
        }
    }

    fetchUserSavedRecipe();
    return (
        <div class="d-flex flex-column align-middle justify-content-center align-items-center">
            {data?.map((element,idx)=>{
                return(
                    <div class="mt-4">
                        <RecipesFormat 
                            key={idx} 
                            id={element._id}
                            name={element.name} 
                            ingredients={element.ingredients}  
                            instructions={element.instruction}
                            imageUrls={element.imageUrls}
                            cookingTime={element.cookingTime}
                            userOwner={element.userOwner}
                            handleSavedRecipes={handleSavedRecipes}
                            isSaved={userSavedRecipe.includes(element._id)}
                        />
                    </div>
                )
            })}
        </div>
    );
}