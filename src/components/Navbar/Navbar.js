import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
// import logo from '../../logoFlush.png'
import './navbar.css'

export default function Navbar(){
  const [cookies , setCookies] = useCookies(["access_token"])
  const navigate = useNavigate();
  const [pointer , setPointer]  = useState(false);
  function logOut(){
    setCookies("access_token","");
    setCookies("access_ID", "");
    navigate('/')
  }
  let revealNavbar =()=>{
    setPointer(!pointer);
  }
    return(

            <>
              <nav className="container">
                <div className="navbar-container">
                  <div className="navbar-container-right">
                    <Link className="navbar-brand" to='/'>FlushRecipeApp</Link>
                  </div>
                  <div id="navbar-middle"  className="navbar-container-middle">
                    <ul >    
                        <li><Link  to='/' > Home </Link></li>
                        <li><Link  to='/about-us'> About us </Link></li>
                        <li><Link>Blogs</Link></li>
                      {cookies.access_token &&
                          <>
                            <li><Link  to='/create-recipe'> Create Recipe </Link></li>
                            <li><Link  to='/saved-recipes'> Saved Recipes </Link></li>   
                            <li><Link  to='/profile'> Profile </Link></li> 
                            <button className="btn btn-danger" onClick={logOut}>Logout</button>
                        </>
                          }
                          
                    </ul>
                  </div>
                  <div className="navbar-container-left">
                        {cookies.access_token ?
                        <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                        <img style={{objectFit:'cover', objectPosition:'center'}} className="rounded-circle ms-3" width="40" height="40" src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"/>
                        </>                  
                        :
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                        <button onClick={()=>{navigate("/Login")}} className="login-btn">Login</button>
                        </>
                    }
                    <div onClick={revealNavbar} id="burger" className="burger">
                      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div >

                </div>
              </nav>
              <div className={`sidebar ${pointer? "open" : ""}`}>
                <hr/>
                    <Link  to='/' > Home </Link>
                    <Link  to='/about-us'> About us </Link>
                    <Link>Blogs</Link>
                      {cookies.access_token &&
                          <>
                            <Link  to='/create-recipe'> Create Recipe </Link>
                            <Link  to='/saved-recipes'> Saved Recipe </Link> 
                            <Link  to='/profile'> Profile </Link>
                            <button className="btn btn-danger" onClick={logOut}>Logout</button>
                        </>
                          }
              </div>
            </>

    );
}