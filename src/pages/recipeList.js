import Footer from "../components/footer/Footer";
import "../components/EdamanRecipe/EdamanRecipe.css";
import {useParams} from 'react-router-dom'
import { useEdamanApi } from "../hooks/useEdaman";
import LoadingPage from "../components/IsLoading/Loading";
import RecipeCard from "../components/recipeCard/recipeCard";
import { useCookies } from "react-cookie";
import { useState, useEffect, useMemo} from "react";
import { useGetUserProfileInfo } from "../components/EdamanRecipe/EdamanRecipe";
import RecipeCardV from "../components/recipeCard/recipeCardV";

export default function RecipeList() {
  const { id } = useParams();
  const { data, isLoading, error } = useEdamanApi(id);
  const [cookies, setCookies] = useCookies(['access_token', 'access_ID']);
  const userID = cookies.access_ID;
  const userToken = cookies.access_token;
  const [counter, setCounter] = useState(0);
  const { dataUser, isLoadingU } = useGetUserProfileInfo(userID, userToken, counter);
  const [savedRecipesState, setSavedRecipesState] = useState([]);

  useEffect(() => {
    if (dataUser?.savedRecipe) {
      setSavedRecipesState(dataUser.savedRecipe);
    }
  }, [dataUser?.savedRecipe]);

  const isSavedRecipe = (recipe) => {
    return savedRecipesState.some((r) => r.label === recipe.label);
  };

  if (isLoading || isLoadingU) {
    return <LoadingPage />;
  }

  if (error) {
    return <p>Error occurred 404</p>;
  }

  return (
    <>
      <section className="container">
        <div className="flex my-5">
          <p className="m-0 fs-1 text-start fw-medium">LIST RECIPE</p>
          <hr />
        </div>

        <div className="recipe-grid">
          {data?.hits.map((element) => {
            return (
              <RecipeCardV
                key={element.label}
                recipe={element?.recipe}
                initialIsSaved={isSavedRecipe(element?.recipe)}
                userID={userID}
                userToken={userToken}
                counter={counter}
                setCounter={setCounter}
                savedRecipes={savedRecipesState}
              />
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
}

