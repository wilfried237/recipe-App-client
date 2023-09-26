import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

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
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup" style={{justifyContent:'center'}}>
      <div class="navbar-nav">

         <Link class="nav-link active" to='/' > Home </Link>

         {!cookies.access_token? <Link class="nav-link active" to='/auth'> Login/Register </Link> : 
         <>
          <Link class="nav-link active" to='/create-recipe'> Create Recipe </Link>
          <Link class="nav-link active" to='/saved-recipes'> Saved Recipes </Link> 
          <button className="btn btn-danger" onClick={logOut}>Logout</button>
         </>
  }

      </div>
    </div>
  </div>
</nav>
    );
}