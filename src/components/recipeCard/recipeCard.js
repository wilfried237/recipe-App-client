import React, { useState} from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import "../EdamanRecipe/EdamanRecipe.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Link } from "react-router-dom";
import { encrypt } from "../Encryption/Encryption";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#FF642F",
  },
  "& .MuiRating-iconHover": {
    color: "#FF8359",
  },
});

const RecipeCard = React.memo(
  ({ recipe, initialIsSaved, handleSaveRecipe }) => {
    const [isSaved, setIsSaved] = useState(initialIsSaved);

    const search = encrypt(recipe.label);

    const handleClick = () => {
      setIsSaved(!isSaved);
      handleSaveRecipe(recipe);
    };

    return (
      <div className="recipe">
        <div className="recipe-image">
          <img alt={recipe.label} src={recipe.image} />
        </div>
        <div className="d-flex align-items-center justify-content-between py-1">
          <StyledRating
            name="customized-color"
            defaultValue={5}
            icon={<StarIcon fontSize="inherit" />}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            className="mt-2"
          />
          {isSaved ? (
            <BookmarksIcon
              onClick={handleClick}
              style={{ cursor: "pointer" }}
              fontSize="large"
              color="rgb(51, 51, 51)"
            />
          ) : (
            <BookmarkBorderIcon
              onClick={handleClick}
              style={{ cursor: "pointer" }}
              fontSize="large"
              color="#333333"
            />
          )}
        </div>
        <Link
          to={{
            pathname: `/recipeForm/${search}`,
          }}
          className="recipe-label fw-medium fs-5 text-decoration-none text-dark"
        >
          {recipe.label}
        </Link>
      </div>
    );
  }
);

export default RecipeCard;
