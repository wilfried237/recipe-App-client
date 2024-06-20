import { useEdamanApi } from "../../hooks/useEdaman";
import "./EdamanRecipe.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import RecipeCard from "../recipeCard/recipeCard";
import LoadingPage from "../IsLoading/Loading";
import { message } from "antd";
import { useCookies } from "react-cookie";
import RecipeCardV from "../recipeCard/recipeCardV";

const useGetUserProfileInfo = (userID, userToken, counter) => {
  const [dataUser, setDataUser] = useState(null);
  const [isLoadingU, setIsLoadingU] = useState(true);

  useEffect(() => {
    const fetchUserProfileInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_PATH}/auth/getUserInfo/${userID}`,
          { headers: { Authorization: userToken } }
        );
        setDataUser(response.data.UserInfo);
        setIsLoadingU(false);
      } catch (error) {
        console.error("Error fetching user profile info:", error);
        setIsLoadingU(false);
      }
    };

    fetchUserProfileInfo();
  }, [userID, userToken, counter]);

  return { dataUser, isLoadingU };
};

function RecipeRoundedTemplate({ search, numberLimite }) {
  const { data, isLoading, error } = useEdamanApi(search);
  const dataHit = data?.hits;
  const handleSeeAll = (SeeAllData) => {
    localStorage.setItem("recipeListData", JSON.stringify(SeeAllData));
  };

  const renderData = () => {
    if (isLoading) {
      return <p>Loading data...</p>;
    }
    if (error) {
      return <p>Error occurred 404</p>;
    }
    const randomIndexes = [];
    while (randomIndexes.length < numberLimite) {
      const random = Math.floor(Math.random() * dataHit.length);
      if (!randomIndexes.includes(random)) {
        randomIndexes.push(random);
      }
    }
    return randomIndexes.map((element, idx) => {
      const randomData = dataHit[element];
      return (
        <Link
          onClick={() => {
            handleSeeAll(dataHit);
          }}
          className="rounded-recipe"
          to={`/recipeList/${search}`}
        >
          <div className="rounded-recipe-image">
            <img
              width={50}
              height={50}
              key={idx}
              alt={search}
              src={randomData.recipe.image}
            />
          </div>
          <h5 className="rounded-recipe-text">{search}</h5>
        </Link>
      );
    });
  };
  return renderData();
}


export default function RecipeTemplateEdaman({ search, numberLimite }) {
  const { data, isLoading, error } = useEdamanApi(search);
  const dataHit = data?.hits;
  const [cookies, setCookies] = useCookies(['access_token', 'access_ID']);
  const userID = cookies.access_ID;
  const userToken = cookies.access_token;
  const [counter, setCounter] = useState(0);
  const { dataUser, isLoadingU } = useGetUserProfileInfo(userID, userToken, counter);
  const [randomIndexes, setRandomIndexes] = useState([]);
  const [savedRecipesState, setSavedRecipesState] = useState([]);

  useEffect(() => {
    if (dataUser?.savedRecipe) {
      setSavedRecipesState(dataUser.savedRecipe);
    }
  }, [dataUser?.savedRecipe]);

  useEffect(() => {
    if (dataHit?.length) {
      const tempRandomIndexes = [];
      for (let i = 0; i < numberLimite; i++) {
        const randomIndex = Math.floor(Math.random() * dataHit.length);
        if (!tempRandomIndexes.includes(randomIndex)) {
          tempRandomIndexes.push(randomIndex);
        }
      }
      setRandomIndexes(tempRandomIndexes);
    }
  }, [dataHit, numberLimite]);

  if (isLoading || isLoadingU) {
    return <LoadingPage />;
  }

  if (error) {
    return <p>Error occurred 404</p>;
  }

  return (
    <>
      {randomIndexes.map((element) => {
        const randomData = dataHit[element];
        console.log(element)
        return (
          <RecipeCardV
            key={element.label}
            recipe={randomData?.recipe}
            initialIsSaved={savedRecipesState.some((r) => r.label === randomData?.recipe.label)}
            userID={userID}
            userToken={userToken}
            counter={counter}
            setCounter={setCounter}
            savedRecipes={savedRecipesState}
          />
        );
      })}
    </>
  );
}

export { RecipeTemplateEdaman, RecipeRoundedTemplate, useGetUserProfileInfo };
