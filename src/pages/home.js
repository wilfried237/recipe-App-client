import axios from "axios";
import React, { useState } from "react";
import RecipesFormat from "../components/Recipes/Recipes";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import useLoader from "../hooks/use-loadrecipe";
import {RecipeRoundedTemplate, RecipeTemplateEdaman} from "../components/EdamanRecipe/EdamanRecipe";
import "../components/EdamanRecipe/EdamanRecipe.css";

export default function Home(){
    const [cookies] = useCookies();
    // const { data, isLoading, error } = useLoader(`${process.env.REACT_APP_API_PATH}/recipes`);
    const [userSavedRecipe, setUserSavedRecipe] = useState([]);
    const navigate = useNavigate();
    // const {data,isLoading,error} = useEdamanApi("cake")
    
    // const handleSavedRecipes = async (id)=>{
    //     try{
    //         if(cookies.access_token){
    //             await axios.put(`${process.env.REACT_APP_API_PATH}/recipes/savedRecipe`,{userID:cookies.access_ID,recipeID:id},{headers:{Authorization: cookies.access_token}});
    //             setUserSavedRecipe([...userSavedRecipe,id]);
    //         }else{
    //              alert("you need to sigIn or signUp");
    //              navigate('/Login');
    //         }
    //     }
    //     catch(err){
    //         console.error(err)
    //     }
    // }

    // const fetchUserSavedRecipe = async ()=>{
    //     try{
    //         if(cookies.access_token){
    //             const response = await axios.get(`${process.env.REACT_APP_API_PATH}/recipes/savedRecipe/${cookies.access_ID}`,{headers:{Authorization: cookies.access_token}});
    //             setUserSavedRecipe(response.data);
    //         }
    //     }catch(err){
    //         console.error(err);
    //     }
    // }

    // fetchUserSavedRecipe();
    return (
        <div>
            <section className="container">
                <h1>Special Burger</h1>
                <div className="recipe-grid">
                    <RecipeTemplateEdaman search={"burger"} numberLimite={3}/>
                </div>
            </section>
{/* 
            <section className="container">
                <h1>Super Delicious</h1>
                <div className="recipe-grid">
                    <RecipeTemplateEdaman search={"pizza"} numberLimite={3}/>
                </div>
            </section>

            <section className="container">
                <h1>Sweet Tooth</h1>
                <div className="recipe-grid">
                    <RecipeTemplateEdaman search={"milkshake"} numberLimite={3}/>
                </div>
            </section>  */}
 
            
              {/* <section className="Popular-categories container ">
                <h1>Popular Categories</h1> 
                <div className="row-circle">
                    <RecipeRoundedTemplate search={"Pasta"} numberLimite={1}/>
                    <RecipeRoundedTemplate search={"Pizza"} numberLimite={1}/>
                    <RecipeRoundedTemplate search={"Vegan"} numberLimite={1}/>
                    <RecipeRoundedTemplate search={"Desserts"} numberLimite={1}/>
                    <RecipeRoundedTemplate search={"Smoothies"} numberLimite={1}/>
                    <RecipeRoundedTemplate search={"Breakfast"} numberLimite={1}/>
                </div>
             </section> */}

            <section style={{backgroundColor:"rgb(255,216,202)"}} className="my-5 px-3 py-5 d-flex flex-column justify-content-center align-items-center">
                <p className="Delice">Deliciousness to your inbox</p>
                <p className="Enjoy">Enjoy weekly hand picked recipes and recommendations</p>
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <input  className="join-input col-sm-6" type="text" placeholder="Email Address"></input>
                    <button className="join-btn ">Join</button>
                </div>
                <p className="joining"> By joining our newsletter you agree to our <u>Terms and conditions</u></p>
            </section>
            <Footer/>
        </div>
    );
}