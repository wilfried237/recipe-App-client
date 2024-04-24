import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom";
import '../components/EdamanRecipe/EdamanRecipe.css'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#FF642F',
      },
      '& .MuiRating-iconHover': {
        color: '#FF8359',
      },
})

export default function RecipeList(){
    const recipeListData = JSON.parse(localStorage.getItem("recipeListData"));
    return(
        <>
        <section className="container" >
            <div className="recipe-grid">
                {recipeListData.map((element,idx)=>{

                    return(
                        <>
                        <Link 
                                onClick={()=>{
                                    localStorage.setItem('recipeData', JSON.stringify(element.recipe));  
                                    localStorage.setItem('recipeCategory',JSON.stringify(recipeListData));
                                }}
                                to={{
                                pathname : `/recipeForm`,
                                    }} className="recipe">
                                    <div className="recipe-image">
                                        <img alt={element.recipe.label} key={idx} src={element.recipe.image}/>
                                    </div>
                                    <StyledRating
                                        name="customized-color"
                                        defaultValue={5}
                                        icon={<StarIcon fontSize="inherit" />}
                                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                        className="mt-2"
                                    />
                                    <h5 className="recipe-label" key={idx}>{element.recipe.label}</h5>  
                        </Link>
                        </>
                    );
                })}
            </div>
        </section>
        <Footer/>
        </>
        
    );
}