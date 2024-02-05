import React, { useState } from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AuthPage from "./pages/auth";
import Home from "./pages/home";
import CreateRecipe from "./pages/createRecipe";
import SaveRecipe from "./pages/savedRecipe";
import Navbar from "./components/Navbar/Navbar";
import ResetPassword from "./pages/resetpassword";
import Registration from "./pages/registration";
import LoginPage from "./pages/login";
import Categories from "./pages/categories";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { RecipeFormat } from "./components/Recipes/Recipe";

export default function App(){
    const queryClient = new QueryClient();
    const [recipeDataFormat, setRecipeDataFormat] = useState({});
    return(
        <div>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Navbar/>
                    <Routes>
                        <Route path="/auth" element={<AuthPage/>} />
                        <Route path="/recipeForm/:search" element={<RecipeFormat/>}/>
                        <Route path="/" element={<Home/>} />
                        <Route path="/register" element={<Registration/>} />
                        <Route path="/create-recipe" element={<CreateRecipe/>} />
                        <Route path="/saved-recipes" element={<SaveRecipe/>} />
                        <Route path="/reset-password" element={<ResetPassword/>} />
                        <Route path="/Login" element={<LoginPage/>}/>
                        <Route path="/categories" element={<Categories/>}/>
                    </Routes>
                </Router>
            </QueryClientProvider>
        </div>
    );
}
