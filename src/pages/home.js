import axios from "axios";
import React, { useState } from "react";
import RecipesFormat from "../components/Recipes";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";

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
 
    const {data,isError,isLoading} = useQuery(['recipes'],fetchData)
    
    const handleSavedRecipes = async (id)=>{
        try{
            await axios.put(`${process.env.REACT_APP_API_PATH}/recipes/savedRecipe`,{userID:cookies.access_ID,recipeID:id});
            setUserSavedRecipe([...userSavedRecipe,id]);
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
            const response = await axios.get(`${process.env.REACT_APP_API_PATH}/recipes/savedRecipe/${cookies.access_ID}`);
            setUserSavedRecipe(response.data);
            // console.log(response.data);
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