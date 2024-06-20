import LoadingPage from "../components/IsLoading/Loading";
import { useState, useMemo, useEffect } from "react";
import { message } from "antd";
import axios from "axios";
import { useGetUserProfileInfo } from "../components/EdamanRecipe/EdamanRecipe";
import { useCookies } from "react-cookie";
import RecipeCard from "../components/recipeCard/recipeCard";
import Footer from "../components/footer/Footer";

export default function SaveRecipe() {
  const [cookies, setCookies] = useCookies(["access_token", "access_ID"]);
  const userID = cookies.access_ID;
  const userToken = cookies.access_token;
  const [counter, setCounter] = useState(0);
  const { dataUser, isLoadingU } = useGetUserProfileInfo(
    userID,
    userToken,
    counter
  );

  const [savedRecipes, setSavedRecipes] = useState([]);

  const savedRecipesState = useMemo(
    () => dataUser?.savedRecipe || [],
    [dataUser?.savedRecipe]
  );

  useEffect(() => {
    setSavedRecipes(savedRecipesState);
  }, [savedRecipesState]);

  const isSavedRecipe = (recipe) => {
    return savedRecipes.some((r) => r.label === recipe.label);
  };

  const handleSaveRecipe = async (recipe) => {
    if (userToken && userID) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_PATH}/auth/saveRecipe/${userID}`,
          { recipe: recipe },
          { headers: { Authorization: userToken } }
        );
        setCounter(counter + 1);
        message.success(response.data.message);
        if (isSavedRecipe(recipe)) {
          setSavedRecipes(savedRecipes.filter((r) => r.label !== recipe.label));
        } else {
          setSavedRecipes([...savedRecipes, recipe]);
        }
      } catch (error) {
        message.error("Error fetching user profile info:", error);
      }
    } else {
      message.error("You Need to LogIn");
    }
  };

  if (isLoadingU) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="container my-5">
        <div className="flex my-5">
          <p className="m-0 fs-1 text-start fw-medium">SAVED RECIPES</p>
          <hr />
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 align-items-center">
          {savedRecipes.map((recipe) => (
            <RecipeCard
              className="col"
              recipe={recipe}
              initialIsSaved={isSavedRecipe(recipe)}
              handleSaveRecipe={handleSaveRecipe}
              key={recipe.label}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
