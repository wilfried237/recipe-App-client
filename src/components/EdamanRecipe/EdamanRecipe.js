import { useEdamanApi } from "../../hooks/useEdaman";
import "./EdamanRecipe.css";
import { Link } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';

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

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#FF642F',
      },
      '& .MuiRating-iconHover': {
        color: '#FF8359',
      },
})

function RecipeTemplateEdaman ({search, numberLimite}){
    const {data, isLoading, error} = useEdamanApi(search);
    const dataHit = data?.hits;
        if(isLoading){
            return(
                <div className="d-flex flex-row justify-content-center flex-wrap gap-5">  
                    <div>
                        <Skeleton className="recipe-image-loading rounded" variant="rectangular" animation="wave" height={250}></Skeleton>
                        <Skeleton className="mt-2" variant="text" sx={{ fontSize: '1rem' }} />
                    </div>
                    <div>
                        <Skeleton className="recipe-image-loading rounded" variant="rectangular" animation="wave" height={250}></Skeleton>
                        <Skeleton className="mt-2" variant="text" sx={{ fontSize: '1rem' }} />
                    </div>
                    <div>
                        <Skeleton className="recipe-image-loading rounded" variant="rectangular" animation="wave" height={250}></Skeleton>
                        <Skeleton className="mt-2" variant="text" sx={{ fontSize: '1rem' }} />
                    </div>                  
                </div>
            ) 
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
                                    <StyledRating
                                        name="customized-color"
                                        defaultValue={5}
                                        icon={<StarIcon fontSize="inherit" />}
                                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                        className="mt-2"
                                    />
                                    <h5 className="recipe-label" key={idx}>{randomData.recipe.label}</h5>  
                                </Link>
                        )
                    })
            }
        </>
    )
}

export {RecipeTemplateEdaman, RecipeRoundedTemplate}