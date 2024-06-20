import axios from "axios";
import React, { useState } from "react";
import Footer from "../components/footer/Footer";
import {
  RecipeRoundedTemplate,
  RecipeTemplateEdaman,
} from "../components/EdamanRecipe/EdamanRecipe";
import "../components/EdamanRecipe/EdamanRecipe.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { message } from "antd";
import CircularProgress from "@mui/material/CircularProgress";

export default function Home() {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
  });
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const OnSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_PATH}/newsLetter/subscribe/${data.email}`
      );
      if (response.data.flag === true) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      message.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (errors?.email) {
    message.error(errors.email?.message);
  }

  return (
    <>
      <div className="container">
        <div className="flex my-5">
          <p className="m-0 fs-1 text-start fw-medium">HOME</p>
          <hr />
        </div>
        <section className="container">
          <h1>Special Burger</h1>
          <div className="recipe-grid">
            <RecipeTemplateEdaman search={"burger"} numberLimite={3} />
          </div>
        </section>

        <section className="container">
          <h1>Super Delicious</h1>
          <div className="recipe-grid">
            <RecipeTemplateEdaman search={"pizza"} numberLimite={3} />
          </div>
        </section>

        <section className="container">
          <h1>Sweet Tooth</h1>
          <div className="recipe-grid">
            <RecipeTemplateEdaman search={"milkshake"} numberLimite={3} />
          </div>
        </section>

        <section className="Popular-categories container ">
          <h1>Popular Categories</h1>
          <div className="d-flex justify-content-center flex-row align-items-center gap-3 flex-wrap my-4">
            <RecipeRoundedTemplate search={"Pasta"} numberLimite={1} />
            <RecipeRoundedTemplate search={"Pizza"} numberLimite={1} />
            <RecipeRoundedTemplate search={"Vegan"} numberLimite={1} />
            <RecipeRoundedTemplate search={"Desserts"} numberLimite={1} />
            <RecipeRoundedTemplate search={"Smoothies"} numberLimite={1} />
            <RecipeRoundedTemplate search={"Breakfast"} numberLimite={1} />
          </div>
        </section>

        <section
          style={{ backgroundColor: "rgb(255,216,202)" }}
          className="my-5 px-3 py-5 d-flex flex-column justify-content-center align-items-center"
        >
          <p className="Delice">Deliciousness to your inbox</p>
          <p className="Enjoy">
            Enjoy weekly hand picked recipes and recommendations
          </p>
          <form onSubmit={handleSubmit(OnSubmit)}>
            <div className="col-12 d-flex justify-content-center align-items-center">
              <input
                className="join-input col-sm-6 col-md-9"
                type="text"
                placeholder="Email Address"
                {...register("email")}
              ></input>
              {loading ? (
                <button type="button" className="join-btn">
                  <CircularProgress size={20} sx={{color: "white"}} />
                </button>
              ) : (
                <button type="submit" className="join-btn">
                  Join
                </button>
              )}
            </div>
          </form>
          <p className="joining">
            {" "}
            By joining our newsletter you agree to our{" "}
            <u>Terms and conditions</u>
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
