import React from "react";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import AuthPage from "./pages/auth";
import Home from "./pages/home";
import CreateRecipe from "./pages/createRecipe";
import SaveRecipe from "./pages/savedRecipe";
import Navbar from "./components/Navbar";

export default function App(){
    return(
        <div>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/auth" element={<AuthPage/>} />
                    <Route path="/" element={<Home/>} />
                    <Route path="/create-recipe" element={<CreateRecipe/>} />
                    <Route path="/saved-recipes" element={<SaveRecipe/>} />
                </Routes>
            </Router>
        </div>
    );
}
