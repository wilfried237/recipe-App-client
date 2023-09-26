
const RecipesFormat = ({id,name,ingredients,instructions,imageUrls,cookingTime,userOwner,handleSavedRecipes, isSaved}) =>{
    
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
                    <p class="card-text"> Cooking Time : {cookingTime} mins </p>                  
                    
                    {
                        isSaved?
                    <button  class="btn btn-primary disabled">Saved
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save ms-2" viewBox="0 0 16 16">
                            <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                        </svg>
                    </button> 
                        :
                    <button onClick={()=>handleSavedRecipes(id)}  class="btn btn-primary">Save 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save ms-2" viewBox="0 0 16 16">
                        <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                    </svg>
                </button>
                    }


                </div>
            </div> 
        </>
    )
}

export default RecipesFormat