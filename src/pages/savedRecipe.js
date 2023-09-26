import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import RecipesFormatSaved from "../components/SavedRecipe";

export default function SaveRecipe(){
    const [cookies, setCookies] = useCookies(["access_token","access_ID"]);
    const [saveRecipe, setSavedRecipe] = useState([]);
    const UserID = cookies?.access_ID;

    const deleteSavedRecipe = async (id)=>{
        try{
            const userRecipeSaved = await axios.put(`${process.env.REACT_APP_API_PATH}/recipes/deleteRecipe`, {id,UserID});
            const respond = saveRecipe.filter((element) => element._id!=id );
            setSavedRecipe(respond);
        }
        catch(err)
        {
            console.error(err);
        }
    }

    const getUserSavedRecipe = async() =>{
        try{ 
            const userRecipeSaved = await axios.post(`${process.env.REACT_APP_API_PATH}/recipes/savedRecipes`, {userID:UserID});
            
            setSavedRecipe(userRecipeSaved.data); 
        }
        catch(err){ 
            console.error(err);
        } 
    }
    useEffect(()=>{
        getUserSavedRecipe();
    },[]);
    return(
    <div>
         {
            saveRecipe?.map((element,idx)=>{
                return(
                    <div className="d-flex justify-content-center align-items-center mt-4">
                            <RecipesFormatSaved deleteSavedRecipe={deleteSavedRecipe} id={element._id} name={element.name} ingredients={element.ingredients} instructions={element.instructions} imageUrls={element.imageUrls} cookingTime={element.cookingTime} key={idx} />
                    </div>

                )

            })
        }
    </div>
    );

}