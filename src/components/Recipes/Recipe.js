import Footer from "../footer/Footer";
import React, {useState } from "react";
import { useEdamanApi } from "../../hooks/useEdaman";
import { Link, useParams } from 'react-router-dom';
import './Recipe.css'
import Checked from './../../images/Checked.png'
import unChecked from './../../images/unCkecked.png'
import Accordion from '@mui/material/Accordion';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';

function RecipeFormat(){

    const RDO = JSON.parse(localStorage.getItem('recipeData'));
    const [selectedItem, setSelectedItem] = useState([]);
    const [nutrition, setNutrition] = useState(7);
    const nutritionData = RDO.totalNutrients;
    const nutritionItems = Object.values(nutritionData).slice(0,nutrition);
    const recipeDataCategory =JSON.parse(localStorage.getItem('recipeCategory'));
    
    const searchElement = useParams();
    const search = searchElement.search;

    const handleIngredientClick = (ingredient)=>{
        if(selectedItem.includes(ingredient)){
            const newArray = selectedItem.filter((element)=>element!=ingredient);
             return setSelectedItem(newArray);
        }else{
            return setSelectedItem([...selectedItem, ingredient]);
        }
    }

    const handleLoadMore = ()=>{
        setNutrition(nutrition+5);
    }

    const handleShowLess = () =>{
        setNutrition(7);
    }

    function MoreRecipes({search}){
        const currentElements = [];
    
        for(let i=0; i<5; i++){
            const RandomNumber = Math.floor(Math.random()*recipeDataCategory.length);
            if(!currentElements.includes(RandomNumber) && RandomNumber!=1){
                currentElements.push(RandomNumber);
            }
        }
    
        return(
            <div className="d-flex flex-column gap-3 ">
                {currentElements.map((value,index)=>{
                    const randomRecipe = recipeDataCategory[value];
                    console.log(randomRecipe);
                    const RecipeData = JSON.stringify(randomRecipe?.recipe);
                    const label = randomRecipe?.recipe?.label;
                    const image = randomRecipe?.recipe?.image;
                    return(
                        <Link
                        className="text-decoration-none"
                        onClick={()=>{
                            if(localStorage.getItem('recipeData') && localStorage.getItem('recipeCategory')){
                                localStorage.removeItem('recipeData');
                            }
                            localStorage.setItem('recipeData', RecipeData);  
                            window.location.reload();     
                        }}
                        to={{
                            pathname : `/recipeForm/${search}`,
                            }}
                        key={index}
                        >
                            <div className="d-flex align-items-center gap-3">
                                <img className="img-side rounded" alt={label} src={image}/>
                                <p>{label}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        )
    }

    return(
        <div className="RecipeForm container p-2">
            <h1>{RDO.label}</h1>
            <img className="img-fluid aspect-ratio rounded-4 mt-5 mb-5" style={{ aspectRatio: '16/8', objectFit: "cover", objectPosition: 'center' }} width="100%" src={RDO.image} alt={RDO.label}/>
            <section className="d-flex flex-wrap flex-row justify-content-between gap-2">
                <div className="flex-fill mb-4">
                    <div className="recipe-form-brief-info d-flex flex-row gap-0 column-gap-4 mb-5">
                        <div>
                            <p> Prep Time </p>
                            <p> { RDO.totalTime } min</p>
                        </div>
                        <hr/>
                        <div>
                            <p> Cuisine Type</p>
                            <p> { RDO.cuisineType }</p>
                        </div>
                        <hr/>
                        <div>
                            <p> Caution </p>
                            { RDO.cautions.length>0 ? RDO.cautions.map((cautions)=>{
                                return(
                                    <p>{cautions}</p>
                                )
                            }) : <p>N/A</p>}
                        </div>
                   </div>


                    <div>

                        <div>
                            <h3>Ingredients</h3>
                            {RDO.ingredientLines.map((ingredients, index)=>{
                                return(
                                    <div className="d-flex gap-0 column-gap-2 text-center fs-5 mt-4 mb-4">

                                        {selectedItem.includes(ingredients)? <img onClick={()=>{handleIngredientClick(ingredients)}} width="35" height="35" alt={Checked} src={Checked}/> : <img onClick={()=>{handleIngredientClick(ingredients)}} width="35" height="35" alt={unChecked} src={unChecked}/>   } 
                                        <p className={`mt-0 mb-0 ${selectedItem.includes(ingredients)?"barred-text" : ""}`} key={index} onClick={()=>{handleIngredientClick(ingredients)}} style={{ display: "inline" , textDecoration: selectedItem.includes(ingredients)? "line-through" : "none", color: selectedItem.includes(ingredients)&&"rgb(127,127,127)" }}> {ingredients} </p> 
                                                                                     
                                    </div>
                                )
                            })}
                        </div>
                        <div>
                            <h3>Detailed Ingredients</h3>
                                <div>
                                    
                                    {RDO.ingredients.map((ingredient, index)=>{
                                        
                                        return(
                                            <DropdownIngredients ingredient={ingredient} index={index}/>
                                        )
                                    })}
                                </div>
                        </div>

                    </div>
                </div>
                <div className="flex-fill">
                    <section className="mb-5 p-4 rounded " style={{backgroundColor: "rgb(249,249,249)", width: "100%" , maxWidth: "auto"}}>
                        <h1>nutrition fact</h1>

                        <div style={{width:"100%"}} className="nutrition-container d-flex flex-column gap-0 row-gap-1 justify-content-center" >
                            {
                                nutritionItems.map((element,index)=>{
                                    return(
                                        <>
                                            <span className={`nutrition-item ${index>=nutrition-7? 'show' : ''} d-flex justify-content-between`} key={index}>
                                                <p>{element.label}</p>
                                                <p>{Math.round(element.quantity)+" "+element.unit }</p>
                                            </span>
                                            {index < nutritionItems.length - 1 && <hr className="mt-1 mb-1" />}
                                        </>
                                        
                                        
                                    )
                            })
                                    
                            }

                            {
                                nutrition < Object.values(nutritionData).length ? <button className="rounded mt-2" onClick={()=>{handleLoadMore()}}>Load more</button> : <button onClick={()=>{handleShowLess()}}>Show less</button>
                                
                            }
                            
                        </div>

                    </section>
                    <section>
                        <h3>Fresh Recipes</h3>
                        <MoreRecipes name={search}/>
                    </section>
                    <section>
                        
                    </section>
                </div>
                
            </section>
            
            <Footer/>
        </div>
    )
}




function DropdownIngredients({ ingredient, index }) {
    const [isToggled, setIsToggled] = useState(false);
  
    const handleAccordion = () => {
      setIsToggled(!isToggled);
    };
  
    return (
      <Accordion className="mt-2" style={{ maxWidth: "550px" }} expanded={isToggled} onChange={handleAccordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index}-content`}
          id={`panel${index}-header`}
        >
          <Typography>{ingredient.text}</Typography>
        </AccordionSummary>
        
          {isToggled && 
            <AccordionDetails className="d-flex">
                <img height="200" width={"200"} src={ingredient.image} alt={ingredient.text} />
                {/* <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem/>}
                spacing={2}
                >
                    
                </Stack> */}
            </AccordionDetails>
          }

      </Accordion>
    );
  }
  
export {RecipeFormat}