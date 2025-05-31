import Footer from "../footer/Footer";
import React, { useState, useEffect } from "react";
import { useEdamanApi } from "../../hooks/useEdaman";
import { Link, useParams } from "react-router-dom";
import "./Recipe.css";
import Checked from "./../../images/Checked.png";
import unChecked from "./../../images/unCkecked.png";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { decrypt } from "../Encryption/Encryption";
import F404 from "../404/F404";
import LoadingPage from "../IsLoading/Loading";
import { encrypt } from "../Encryption/Encryption";
import CircularProgress from '@mui/material/CircularProgress';

function filterRecipe(data, searchWord){
   let result = data?.filter((element)=>{
      if(element.recipe.label == searchWord){
        return true;
      }
      return false;
   });
  return result
}

function MoreRecipes({ searchIndex }) {
  const { data, isLoading: categoryIsLoading, error: categoryError } = useEdamanApi(searchIndex);
  const recipeDataCategory = data?.hits || [];
  const [currentElements, setCurrentElements] = useState([]);

  useEffect(() => {
    if (recipeDataCategory.length) {
      const newCurrentElements = [];
      for (let i = 0; i < 5; i++) {
        const randomNumber = Math.floor(Math.random() * recipeDataCategory.length);
        if (!newCurrentElements.includes(randomNumber) && randomNumber !== 1) {
          newCurrentElements.push(randomNumber);
        }
      }
      setCurrentElements(newCurrentElements);
    }
  }, [recipeDataCategory]);

  if (categoryIsLoading) {
    return <CircularProgress />;
  }

  if (categoryError) {
    return <div>Error: {categoryError.message}</div>;
  }

  return (
    <div className="d-flex flex-column gap-3">
      {currentElements.map((value, index) => {
        const randomRecipe = recipeDataCategory[value];
        const label = randomRecipe?.recipe?.label;
        const image = randomRecipe?.recipe?.image;
        const newLabel = encrypt(label);
        return (
          <Link
            className="text-decoration-none"
            to={{
              pathname: `/recipeForm/${newLabel}`,
            }}
            key={index}
          >
            <div className="d-flex align-items-center gap-3">
              <img className="img-side rounded" alt={label} src={image} />
              <p className="m-0 text-default fw-medium">{label}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function RecipeFormat() {
  const { id } = useParams();
  const newId = decrypt(id).trim();
  const [RDO, setRDO] = useState(null);
  const [selectedItem, setSelectedItem] = useState([]);
  const [nutrition, setNutrition] = useState(7);
  const { data, isLoading, error } = useEdamanApi(newId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Raw API Data:', data, '\n', 'Query:', newId);
        const filteredData = filterRecipe(data?.hits, newId);
        console.log(filteredData);
        setRDO(filteredData.length > 0 ? filteredData[0].recipe : null);
      } catch (err) {
        console.error('Error fetching recipe data:', err);
      }
    };

    if (data) {
      fetchData();
    }
  }, [data, newId]);

  const nutritionData = RDO?.totalNutrients || {};
  const nutritionItems = Object.values(nutritionData).slice(0, nutrition);

  const handleIngredientClick = (ingredient) => {
    if (selectedItem.includes(ingredient)) {
      const newArray = selectedItem.filter((element) => element !== ingredient);
      setSelectedItem(newArray);
    } else {
      setSelectedItem([...selectedItem, ingredient]);
    }
  };

  const handleLoadMore = () => {
    setNutrition(nutrition + 5);
  };

  const handleShowLess = () => {
    setNutrition(7);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  if (!RDO) {
    return (<F404/>);
  }

  return (
    <>
      <div className="RecipeForm container p-2 mt-4">
        <h1>{RDO?.label}</h1>
        <img
          className="img-fluid aspect-ratio rounded-4 mt-5 mb-5"
          style={{
            aspectRatio: "16/8",
            objectFit: "cover",
            objectPosition: "center",
          }}
          width="100%"
          src={RDO?.image}
          alt={RDO?.label}
        />
        <section className="row justify-content-between gap-2 mb-5">
          <div className="col">
            <div className="recipe-form-brief-info d-flex flex-row gap-0 column-gap-4 mb-5">
              <div>
                <p> Prep Time </p>
                <p> {RDO?.totalTime} min</p>
              </div>
              <hr />
              <div>
                <p> Cuisine Type</p>
                <p> {RDO?.cuisineType}</p>
              </div>
              <hr />
              <div>
                <p> Caution </p>
                {RDO?.cautions?.length > 0 ? (
                  RDO?.cautions.map((cautions) => {
                    return <p>{cautions}</p>;
                  })
                ) : (
                  <p>N/A</p>
                )}
              </div>
            </div>

            <div>
              <div>
                <h3>Ingredients</h3>
                {RDO?.ingredientLines.map((ingredients, index) => {
                  return (
                    <div className="d-flex gap-0 column-gap-2 text-center fs-5 mt-4 mb-4">
                      {selectedItem?.includes(ingredients) ? (
                        <img
                          onClick={() => {
                            handleIngredientClick(ingredients);
                          }}
                          width="35"
                          height="35"
                          alt={Checked}
                          src={Checked}
                        />
                      ) : (
                        <img
                          onClick={() => {
                            handleIngredientClick(ingredients);
                          }}
                          width="35"
                          height="35"
                          alt={unChecked}
                          src={unChecked}
                        />
                      )}
                      <p
                        className={`mt-0 mb-0 ${
                          selectedItem?.includes(ingredients)
                            ? "barred-text"
                            : ""
                        }`}
                        key={index}
                        onClick={() => {
                          handleIngredientClick(ingredients);
                        }}
                        style={{
                          display: "inline",
                          textDecoration: selectedItem?.includes(ingredients)
                            ? "line-through"
                            : "none",
                          color:
                            selectedItem?.includes(ingredients) &&
                            "rgb(127,127,127)",
                        }}
                      >
                        {" "}
                        {ingredients}{" "}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div>
                <h3>Detailed Ingredients</h3>
                <div>
                  {RDO?.ingredients?.map((ingredient, index) => {
                    return (
                      <DropdownIngredients
                        ingredient={ingredient}
                        index={index}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <section
              className="mb-5 p-4 rounded "
              style={{
                backgroundColor: "rgb(249,249,249)",
                width: "100%",
                maxWidth: "auto",
              }}
            >
              <h1>Nutrition Fact</h1>

              <div
                style={{ width: "100%" }}
                className="nutrition-container d-flex flex-column gap-0 row-gap-1 justify-content-center"
              >
                {nutritionItems.map((element, index) => {
                  return (
                    <>
                      <span
                        className={`nutrition-item ${
                          index >= nutrition - 7 ? "show" : ""
                        } d-flex justify-content-between`}
                        key={index}
                      >
                        <p>{element.label}</p>
                        <p>
                          {Math.round(element.quantity) + " " + element.unit}
                        </p>
                      </span>
                      {index < nutritionItems.length - 1 && (
                        <hr className="mt-1 mb-1" />
                      )}
                    </>
                  );
                })}

                {nutrition < Object.values(nutritionData).length ? (
                  <div className="d-flex justify-content-center align-items-center ">
                    <button
                        className="rounded mt-2 btn btn-lg btn-outline-dark px-4 px-md-5"
                        onClick={() => {
                        handleLoadMore();
                        }}
                    >
                        Load more
                    </button>
                  </div>

                ) : (
                <div className="d-flex justify-content-center align-items-center ">
                  <button
                    className="rounded mt-2 btn btn-lg btn-outline-dark px-4 px-md-5"
                    onClick={() => {
                      handleShowLess();
                    }}
                  >
                    Show less
                  </button>
                </div>
                )}
              </div>
            </section>
            <section>
              <h3>Fresh Recipes</h3>
              <MoreRecipes searchIndex={newId[0]}/>
            </section>
            <section></section>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

function DropdownIngredients({ ingredient, index }) {
  const [isToggled, setIsToggled] = useState(false);

  const handleAccordion = () => {
    setIsToggled(!isToggled);
  };

  return (
    <Accordion
      className="mt-2"
      style={{ maxWidth: "550px" }}
      expanded={isToggled}
      onChange={handleAccordion}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index}-content`}
        id={`panel${index}-header`}
      >
        <Typography>{ingredient.text}</Typography>
      </AccordionSummary>

      {isToggled && (
        <AccordionDetails className="d-flex">
          <img
            className="rounded"
            height="200"
            width={"200"}
            src={ingredient.image}
            alt={ingredient.text}
          />
        </AccordionDetails>
      )}
    </Accordion>
  );
}

export { RecipeFormat };
