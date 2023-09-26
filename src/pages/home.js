import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipesFormat from "../components/Recipes";
import { Cookies, useCookies } from "react-cookie";

export default function Home(){
    const [cookies, setCookies] = useCookies();
    const [userSavedRecipe, setUserSavedRecipe] = useState([]);
    const [recipes , setRecipes ] = useState([]);
 
    
    const handleSavedRecipes = async (id)=>{
        try{
            const response = await axios.put(`${process.env.REACT_APP_API_PATH}/savedRecipe`,{userID:cookies.access_ID,recipeID:id});
            setUserSavedRecipe([...userSavedRecipe,id]);
        }
        catch(err){
            console.error(err)
        }
    }

    const fetchData = async()=>{
        try{
           const response = await axios.get(`${process.env.REACT_APP_API_PATH}/recipes`);
           setRecipes(response.data);
        }catch(err){
            console.error(err);
        }
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

    useEffect(()=>{
        fetchData();
        fetchUserSavedRecipe();
    },[]);

    return (
        <div class="d-flex flex-column align-middle justify-content-center align-items-center">
            {recipes?.map((element,idx)=>{
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
            {/* {userSavedRecipe?.map((element,idx)=>{
                return(
                    // 
                    <div class="mt-4">
                        <p>{element}</p>
                        <p>{userSavedRecipe.includes('6508495b098cec40823c8150') ? "Yes":"No"}</p>
                    </div>
                )
            })} */}
        </div>
    );
}