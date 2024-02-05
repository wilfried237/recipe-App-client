import { useEdamanApi } from "../../hooks/useEdaman";
import "./EdamanRecipe.css";
import { Link } from "react-router-dom";

function RecipeRoundedTemplate ({search, numberLimite}){
    const {data, isLoading, error } = useEdamanApi(search);
    const dataHit = data?.hits;
    const renderData = ()=>{
        if(isLoading){
            return <p>Loading data...</p>
        }
        if(error){
            return <p>Error occurred 404</p>
        }
        const randomIndexes = [];
        while(randomIndexes.length < numberLimite){
            const random = Math.floor(Math.random()*dataHit.length);
            if(!randomIndexes.includes(random)){
                randomIndexes.push(random);
            }
        }
        return randomIndexes.map((element, idx)=>{
            const randomData = dataHit[element]
            return(
                    <Link className="rounded-recipe" to='/categories'>
                        <div className="rounded-recipe-image">
                            <img key={idx} alt={search} src={randomData.recipe.image}/>
                        </div>
                        <h5 className="rounded-recipe-text">{search}</h5>
                    </Link>
            )
        });
    }
    return(
        renderData()
    )
}

function RecipeTemplateEdaman ({search, numberLimite}){
    const {data, isLoading, error} = useEdamanApi(search);
    const dataHit = data?.hits;

        if(isLoading){
            return <p>Loading data...</p>
        }

        if(error){
            return <p>Error occurred 404</p>
        }

        const randomIndexes = [];
         for(let i=0;i<numberLimite;i++){
            const randomIndex= Math.floor(Math.random()*dataHit.length);
            if(!randomIndexes.includes(randomIndex)){
                randomIndexes.push(randomIndex);
            }
        }


 
    return(
        <>
            {
                       randomIndexes.map((element,idx)=>{
                        const randomData = dataHit[element];
                        const RecipeData = JSON.stringify(randomData.recipe);
                        const recipeDataCategory = JSON.stringify(dataHit);
                        return(
                                <Link 
                                onClick={()=>{
                                    if(localStorage.getItem('recipeData') && localStorage.getItem('recipeCategory')){
                                        localStorage.removeItem('recipeData');
                                        localStorage.removeItem('recipeCategory');
                                    }
                                    localStorage.setItem('recipeData', RecipeData);  
                                    localStorage.setItem('recipeCategory',recipeDataCategory);
                                }}
                                to={{
                                pathname : `/recipeForm/${search}`,
                                    }} className="recipe">
                                    <div className="recipe-image">
                                        <img alt={randomData.recipe.label} key={idx} src={randomData.recipe.image}/>
                                    </div>
                                    
                                    <h5 className="recipe-label" key={idx}>{randomData.recipe.label}</h5>  
                                </Link>
                        )
                    })
            }
        </>
    )
}

export {RecipeTemplateEdaman, RecipeRoundedTemplate}