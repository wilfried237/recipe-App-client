import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import logo from "../logoFlush.png"

export default function Navbar(){
  const [cookies , setCookies] = useCookies(["access_token"])
  const navigate = useNavigate();

  function logOut(){
    // localStorage.removeItem("User")
    setCookies("access_token","");
    setCookies("access_ID", "");
    navigate('/auth')
  }

    return(
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
              <div class="container">
                <header className="row" style={{width:'100%'}}>
                <Link className="navbar-brand me-0 col-auto" to='/'>FlushRecipeApp</Link>
                  {/* <img className="img-fluid" src={logo}/> */}
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                  <div class="collapse navbar-collapse justify-content-center col-8 width-100%" id="navbarNavAltMarkup">

                      <div class="navbar-nav">

                        <Link class="nav-link active" to='/' > Home </Link>
                        <Link className="nav-link active" to='/about-us'> About us </Link>
                        {!cookies.access_token? <Link class="nav-link active" to='/auth'> Login/Register </Link> : 
                        <>
                          <Link class="nav-link active" to='/create-recipe'> Create Recipe </Link>
                          <Link class="nav-link active" to='/saved-recipes'> Saved Recipes </Link> 
                          <Link className="nav-link active" to='/profile'>Profile</Link>
                          <button className="btn btn-danger" onClick={logOut}>Logout</button>
                        </>
                          }

                      </div>

                  </div>
                  {cookies.access_token &&                   
                    <div className="col-auto d-flex justify-content-center align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                      </svg>
                      <img style={{objectFit:'cover', objectPosition:'center'}} className="rounded-circle ms-3" width="40" height="40" src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"/>
                    </div>
                  }

                </header>
              </div>
            </nav>
    );
}