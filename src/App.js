import React, { createContext, useContext, useState } from "react";
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
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert';

const SnackbarContext = createContext();

export const useSnackbar = ()=> useContext(SnackbarContext);

export const SnackbarProvider=({children})=>{
    const [snackBarInfo, setSnackBarInfo] = useState({
        message: null,
        open: false,
        setOpen: () => {},
        onClose: (event,reason) => {
                if(reason === 'clickaway'){
                  return;
                }
                setSnackBarInfo({...snackBarInfo,open:false});
        },
        duration: 5000,
        severity: 'info',
        action: () => {},
      });
    
      return (
        <SnackbarContext.Provider value={{ snackBarInfo, setSnackBarInfo }}>
          {children}
        </SnackbarContext.Provider>
      );
}

export default function App(){
    const queryClient = new QueryClient();

    function CustomSnackBar(){
        const {snackBarInfo} = useSnackbar();
        function Alert(props) {
            return <MuiAlert severity={snackBarInfo.severity} elevation={6} variant="filled" {...props} />;
          }
      
          return (
            <Snackbar
              open={snackBarInfo.open}
              onClose={snackBarInfo.onClose}
              action={snackBarInfo.action}
              autoHideDuration={6000}
            >
              <div>
                <Alert>
                  {snackBarInfo.message}
                </Alert>
              </div>
            </Snackbar>
          );
    }

    return(
        <div>
            <QueryClientProvider client={queryClient}>
                <SnackbarProvider>
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
                        <CustomSnackBar/>
                    </Router>
                </SnackbarProvider>
            </QueryClientProvider>
        </div>
    );
}


