import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import LoginPage from "../../pages/login";
import Dialog from "@mui/material/Dialog";
import "./navbar.css";
import CloseIcon from "@mui/icons-material/Close";
import Input from "@mui/material/Input";
import axios from "axios";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { encrypt } from "../Encryption/Encryption";
import {Drawer} from 'antd';
const useGetUserProfileInfo = (userID, userToken, counter) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfileInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_PATH}/auth/getUserInfo/${userID}`,
          { headers: { Authorization: userToken } }
        );
        setData(response.data.UserInfo);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile info:", error);
        setIsLoading(false);
      }
    };

    fetchUserProfileInfo();
  }, [userID, userToken, counter]);

  return { data, isLoading };
};

export default function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token", "access_ID"]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [backdropLogin, setBackdropLogin] = useState(false);
  const [revealSearch, setRevealSearch] = useState(false);
  const [searchElement, setSearchElement] = useState("");
  const [searchRecipeData, setSearchRecipeData] = useState([]);
  const [isSearchReceived, setIsSearchReceived] = useState(false);
  const userID = cookies.access_ID;
  const userToken = cookies.access_token;
  const [counter, setCounter] = useState(0);
  const { data, isLoading } = useGetUserProfileInfo(userID, userToken, counter);

  // const revealNavbar = () => {
  //   setPointer(!pointer);
  // };

  const showDrawer = () =>{
    setOpen(true);
  }

  const onClose = () =>{
    setOpen(false);
  }

  const handleCloseLoginBackDrope = () => {
    setBackdropLogin(false);
  };
  const handleOpenLoginBackDrope = () => {
    setBackdropLogin(true);
  };
  const handleRevealSearchOpen = () => {
    setRevealSearch(true);
  };
  const handleRevealSearchClose = () => {
    setRevealSearch(false);
    setSearchElement("");
  };
  const handleOnchangeSearch = (event) => {
    setSearchElement(event.target.value);
  };
  const HandleRedirectToRecipe = (recipe, searchData) => {
    localStorage.setItem("recipeData", JSON.stringify(recipe.recipe));
    localStorage.setItem("recipeMoreCategory", searchData);
    setSearchElement("");
    setRevealSearch(false);
    setSearchRecipeData([]);
    setCounter(counter + 1);
    navigate(`/recipeForm/${encrypt(recipe?.recipe.label)}`);
  };
  const handleSeeAll = (SeeAllData) => {
    localStorage.setItem("recipeListData", JSON.stringify(SeeAllData));
    setSearchElement("");
    setRevealSearch(false);
    setSearchRecipeData([]);
    setCounter(counter + 1);
    navigate(`/recipeList/${searchElement}`);
  };

  useEffect(() => {
    const fetchData = async (search) => {
      setIsSearchReceived(true);
      const { data } = await axios
        .get(
          `https://api.edamam.com/search?q=${search}&app_id=5e65853d&app_key=745b5b448240096e69bd7c64fab12072&from=0&to=100`
        )
        .finally(() => setIsSearchReceived(false));
      const dataHit = data?.hits;
      setSearchRecipeData(dataHit);
    };
    fetchData(searchElement);
  }, [searchElement]);

  return (
    <>
      {revealSearch ? (
        <div className="container py-3">
          {/* search Part */}
          <Input
            id="standard-adornment-weight"
            endAdornment={
              <CloseIcon
                sx={{ cursor: "pointer" }}
                onClick={handleRevealSearchClose}
                on
                fontSize="large"
                position="end"
              />
            }
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
            className="custom-input"
            onChange={(e) => {
              handleOnchangeSearch(e);
            }}
            fullWidth
          />
          <div
            className="row mt-1"
            style={{ maxHeight: "400px", overflow: "hidden" }}
          >
            {isSearchReceived ? (
              <div>
                <div className="d-flex gap-2 align-items-center">
                  <Skeleton
                    animation="wave"
                    className="rounded"
                    variant="rectangle"
                    width={80}
                    height={80}
                  />
                  <Skeleton animation="wave" width={250} variant="text" />
                </div>
              </div>
            ) : (
              <>
                {searchRecipeData.slice(0, 4).map((element, index) => {
                  return (
                    <div className="d-flex flex-column gap-1 justify-content-center">
                      <div className="d-flex gap-2 align-items-center loaded-image-recipe">
                        <img
                          alt={index + element}
                          className="rounded"
                          width={80}
                          height={80}
                          key={index}
                          src={element.recipe.image}
                        />
                        <p
                          onClick={() => {
                            HandleRedirectToRecipe(element, searchElement);
                          }}
                          className="fw-medium"
                          key={index}
                        >
                          {element.recipe.label}
                        </p>
                      </div>
                      <Divider className="mb-1" variant="middle" />
                    </div>
                  );
                })}
                {searchRecipeData.length > 5 && (
                  <div className="d-flex justify-content-center">
                    <Button
                      sx={{
                        color: "black",
                        borderColor: "black",
                        "&:hover": {
                          backgroundColor: "black",
                          color: "white",
                        },
                      }}
                      className="px-4 py-2"
                      variant="outlined"
                      onClick={() => {
                        handleSeeAll(searchRecipeData);
                      }}
                    >
                      See all {searchRecipeData.length} Results{" "}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <nav className="container">
            <div className="navbar-container">
              <div className="navbar-container-right">
                <Link className="navbar-brand" to="/">
                  FlushRecipeApp
                </Link>
              </div>
              <div id="navbar-middle" className="navbar-container-middle">
                <ul>
                  <li>
                    <Link to="/"> Home </Link>
                  </li>
                  <li>
                    <Link to="/about-us"> About us </Link>
                  </li>
                  <li>
                    <Link to="/Blog">Blogs</Link>
                  </li>
                  {cookies.access_token && (
                    <>
                      <li>
                        <Link to="/saved-recipes"> Saved Recipes </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div className="navbar-container-left">
                {cookies.access_token ? (
                  <>
                    <svg
                      style={{ cursor: "pointer" }}
                      onClick={handleRevealSearchOpen}
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                    {data?.profilePic.path == null ? (
                      <a
                        className="rounded-circle ms-3 text-uppercase text-center d-flex justify-content-center align-items-center fw-medium"
                        onClick={() => {
                          navigate("/Profile");
                        }}
                        style={{
                          textDecoration: "none",
                          height: "40px",
                          width: "40px",
                          backgroundColor: "rgb(255,100,47)",
                          color: "white",
                          cursor: "pointer"
                        }}
                      >
                        {data?.username[0]}
                      </a>
                    ) : (
                      <img
                        onClick={() => {
                          navigate("/Profile");
                        }}
                        alt="Profile"
                        style={{ objectFit: "cover", objectPosition: "center" }}
                        className="rounded-circle ms-3 profile-picture"
                        width="40"
                        height="40"
                        src={data?.profilePic.path}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <svg
                      style={{ cursor: "pointer" }}
                      onClick={handleRevealSearchOpen}
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                    <div>
                      <button
                        onClick={() => {
                          handleOpenLoginBackDrope();
                        }}
                        className="login-btn"
                      >
                        Login
                      </button>
                      <Dialog
                        sx={{
                          color: "#fff",
                          zIndex: (theme) => theme.zIndex.drawer + 1,
                          backdropFilter: backdropLogin && " blur(10px)",
                        }}
                        open={backdropLogin}
                        onClose={() => {
                          handleCloseLoginBackDrope();
                        }}
                        keepMounted
                      >
                        <LoginPage
                          backdropLogin={backdropLogin}
                          setBackdropLogin={setBackdropLogin}
                        />
                      </Dialog>
                    </div>
                  </>
                )}
                <div onClick={showDrawer} id="burger" className="burger">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    class="bi bi-list"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div></div>
          </nav>
          {/** small screen reveal */}
          <Drawer title="FlushRecipe" onClose={onClose} open={open}>
            <div className="container">
              <div className="row text-center fs-5 fw-medium gap-4">
                <Link className="uniqueText" to="/"> Home </Link>
                <Link className="uniqueText" to="/about-us"> About us </Link>
                <Link className="uniqueText" to="/Blog">Blogs</Link>
                {cookies.access_token && (
                  <>
                    <Link className="uniqueText" to="/saved-recipes"> Saved Recipe </Link>
                  </>
              )}
              </div>

            </div>

          </Drawer>
        </>
      )}
    </>
  );
}
