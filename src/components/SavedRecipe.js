
const RecipesFormatSaved = ({id,name,ingredients,instructions,imageUrls,cookingTime,deleteSavedRecipe}) =>{

    return(
        <>
            <div class="card mb-3" style={{width: "18rem"}}>
                <img src={imageUrls} class="card-img-top" alt="Error 404" />
                <div class="card-body">
                        <h5 class="card-title me-3">{name}</h5>
                    <div>
                        {ingredients?.map((element,idx)=>{
                            return(
                                <>
                                    <li key={idx}>{element}</li>
                                </>
                            )
                        })}
                    </div>

                    <p class="card-text">{instructions}</p>
                    <p class="card-text"> Cooking Time : {cookingTime} min </p>
                    <button onClick={ ()=>deleteSavedRecipe(id)}  className= "btn btn-danger" > Delete </button>
                </div>
            </div> 
        </>
    )
}

export default RecipesFormatSaved