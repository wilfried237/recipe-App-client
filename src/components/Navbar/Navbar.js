import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import LoginPage from "../../pages/login";
import Dialog from '@mui/material/Dialog';
import './navbar.css'
import { useSnackbar } from "../../App";
import CloseIcon from '@mui/icons-material/Close';
import Input from '@mui/material/Input';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

export default function Navbar(){
  const [cookies , setCookies] = useCookies(["access_token"])
  const navigate = useNavigate();
  const [pointer , setPointer]  = useState(false);
  const [backdropLogin, setBackdropLogin] = useState(false);
  const {snackBarInfo,setSnackBarInfo} = useSnackbar();
  const [revealSearch, setRevealSearch]  = useState(false);
  const [searchElement, setSearchElement] = useState("");
  const [searchRecipeData, setSearchRecipeData] = useState([]);
  const [isSearchReceived, setIsSearchReceived] = useState(false);
  function logOut(){
    setCookies("access_token","");
    setCookies("access_ID", "");
    navigate('/');
  }
  const revealNavbar = () =>{
    setPointer(!pointer);
  }
  const handleCloseLoginBackDrope = () =>{
    setBackdropLogin(false);
  }
  const handleOpenLoginBackDrope = () =>{
    setBackdropLogin(true);
  }
  const handleRevealSearchOpen= ()=>{
    setRevealSearch(true);
  }
  const handleRevealSearchClose=()=>{
    setRevealSearch(false);
    setSearchElement("");
  }
  const handleOnchangeSearch=(event)=>{
      setSearchElement(event.target.value);
  }
  useEffect(() => {
    const fetchData = async (search) => {
      setIsSearchReceived(true);
      const {data} = await axios.get(`https://api.edamam.com/search?q=${search}&app_id=5e65853d&app_key=745b5b448240096e69bd7c64fab12072&from=0&to=100`).finally(()=>setIsSearchReceived(false));
      const dataHit = data?.hits;
      setSearchRecipeData(dataHit);
      console.log("searchRecipeData");
      console.log(dataHit);
    }
    fetchData(searchElement);
  }, [searchElement]);
    return(
            <>
            {
              revealSearch? 
              <div className="container py-3" >
                {/* <TextField fullWidth label="Search" id="fullWidth" /> */}
                <Input
                  id="standard-adornment-weight"
                  endAdornment={<CloseIcon sx={{cursor:'pointer'}} onClick={handleRevealSearchClose} on fontSize="large" position="end"/>}
                  aria-describedby="standard-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                  // sx={{
                  //   '&:focus': 
                  //       {
                  //         borderColor:"#FF642F",
                  //         borderBottomColor:"#FF642F"
                  //       } 
                  // }}
                  onChange={(e)=>{handleOnchangeSearch(e)}}
                  // color="error"
                  fullWidth
                />
                <div className="row mt-1" style={{maxHeight:"400px",overflow:"hidden"}}>
                  {
                    isSearchReceived?
                    <div>

                     <div> 
                      <Skeleton className="rounded" variant="rectangle" width={80} height={80}/>
                      <Skeleton className="" variant="rectangle" />
                      </div>
                    </div>
                    :
                    <>
                    {searchRecipeData.slice(0,4).map((element,index)=>{
                        return(
                          <div
                           className="d-flex flex-column gap-1 justify-content-center"
                          //  style={{
                          //   '&:hover':{
              
                          //   }
                          //  }}
                           >
                            <div className="d-flex gap-2 align-items-center">
                                <img className="rounded" width={80} height={80} key={index} src={element.recipe.image}/>
                                <p key={index}>{element.recipe.label}</p>
                            </div>
                            <Divider className="mb-1" variant="middle"/>
                          </div>
  
                        )
                      })}
                    {
                                            searchRecipeData.length>5 &&
                                            <div className="d-flex justify-content-center">
                                              <Button sx={{ 
                                                color:"black", 
                                                borderColor:"black",
                                                '&:hover': 
                                                {
                                                  backgroundColor: 'black',
                                                  color:"white"
                                                } 
                                                }}  
                                              className="px-4 py-2" 
                                              variant="outlined" 
                                              >See all {searchRecipeData.length} Results </Button>
                                            </div>
                    }
                    </>
                  }
                </div>
              </div>
              :
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
                        <img alt="Profile" style={{objectFit:'cover', objectPosition:'center'}} className="rounded-circle ms-3" width="40" height="40" src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"/>
                        </>                  
                        :
                        <>
                          <svg style={{cursor:'pointer'}} onClick={handleRevealSearchOpen} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                          </svg>
                          <div>
                            <button onClick={()=>{handleOpenLoginBackDrope()}} className="login-btn">Login</button>
                              <Dialog 
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer+1,backdropFilter:" blur(10px)"}}
                                open={backdropLogin}
                                onClose={()=>{handleCloseLoginBackDrope()}}
                                keepMounted
                              >
                                <LoginPage snackBarInfo={snackBarInfo} setSnackBarInfo={setSnackBarInfo}/>

                              </Dialog>
                          </div>
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
            }
              
            </>

    );
}
