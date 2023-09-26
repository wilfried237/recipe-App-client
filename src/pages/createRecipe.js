import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

export default function CreateRecipe(){
    const [cookies, _] = useCookies(["access_ID"]);
    const userID = cookies.access_ID;

 const onSubmit= async (event) =>{
        event.preventDefault();
        try{
            axios.post(`${process.env.REACT_APP_API_PATH}/recipes`, recipes);
            alert("Recipe created successfully");
        }
        catch(err){
            console.error(err);
        }
    }

    const [recipes,setRecipes] = useState({
        name: '',
        ingredients: [],
        instructions: '',
        imageUrls: '',
        cookingTime: 0,
        userOwner: userID
    });

    function handleChangeIngredients(event, index){
        const {value} = event.target;
        const ingredients = recipes.ingredients;
        ingredients[index] = value
        setRecipes({...recipes, ingredients: ingredients});
    }

    function handleChange(event){
        const {name,value} = event.target;
        setRecipes({...recipes, [name] : value  }); 
    }

    function deleteIngredients(index){
        const ingredients = recipes.ingredients;
        const validIngredients = ingredients.filter((element,idx)=>{
            if(index!=idx){
                return element;
            }
        });
        setRecipes({...recipes, ingredients: validIngredients});
    }

    const addIngredients=()=>{ 
        setRecipes({...recipes, ingredients: [...recipes.ingredients,""]})
    }

    return(
<form onSubmit={onSubmit} style={{width:'100%', alignItems:'center', justifyContent: 'center', display:'grid'}}>
        <h1>Creating Recipes</h1>
        <div class="mb-3">  
            <label for="name" class="form-label">name</label>
            <input onChange={(e)=>{handleChange(e)}} type="text" class="form-control" id="name" name="name" aria-describedby="emailHelp" />
        </div>
        <div class="mb-3">
            <label for="ingredient" class="form-label">ingredients</label>
            <div class="row g-2">
                <div>
                    {recipes?.ingredients.map((ingredients, idx)=>{
                       return(
                       <div class="column g-2">
                            <div>
                                <input  
                                    type="text" 
                                    class="form-control mb-3 col-auto" 
                                    id="ingredients" 
                                    name='ingredients'
                                    key={idx}
                                    onChange={(e)=>{handleChangeIngredients(e,idx)}}
                                /> 
                            </div>
                            <div>
                                <button onClick={()=>{deleteIngredients(idx)}} class="btn btn-danger mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                    </svg>
                                </button>

                            </div>

                       </div>
                       ) 
                    })}
                    
                </div>

                    <button type="button" onClick={addIngredients} class="btn btn-primary"> + </button>
 
            </div>
        </div>
        <div class="mb-3">
            <label for="instructions" class="form-label">instructions</label>
            <input onChange={(e)=>{handleChange(e)}} name="instructions"  type="text" class="form-control" id="instructions" />
        </div>
        <div class="mb-3">
            <label for="imageUrls" class="form-label">imageUrls</label>
            <input onChange={(e)=>{handleChange(e)}} name="imageUrls" type="text" class="form-control" id="imageUrls" />
        </div>
        <div class="mb-3">
            <label for="cookingTime" class="form-label">cookingTime</label>
            <input onChange={(e)=>{handleChange(e)}} name="cookingTime" type="number" class="form-control" id="cookingTime" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
</form> 
    )

}