import "../HomeStyles.css";
// import "../index.css";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Facebook, Google, LinkedIn } from "@mui/icons-material";
import React, { useEffect, useState,useContext } from "react";
import pic from "../assets/pic1.jpg";
import pic2 from "../assets/pic1.jpg";
import basma from "../assets/pic1.jpg";
import omar from "../assets/pic1.jpg";
import mohammmed from "../assets/pic1.jpg";
import ahmed from "../assets/pic1.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { useNavigate } from "react-router-dom";
import authServiceInstance from "../services/Auth";

import { User } from "../Context/UserContext";

const slider = [
  {
    title: "Basma Salim",
    description: "Basma Salim",
    img: basma,
  },
  {
    title: "Omar Maher",
    description: "Omar Maher",
    img: omar,
  },
  {
    title: "Mohammed Saeed",
    description: "Mohammed Saeed",
    img: ahmed,
  },
  {
    title: "Ahmed Abdelshakor",
    description: "Ahmed Abdelshakor",
    img: mohammmed,
  },
];

const Home: React.FC = () => {
  const currentUser = useContext(User);
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <div className="section-container">
        <div className="section main-section">
          <header>
            <h1>
              Skills speak louder <br></br> than words
            </h1>
          </header>
          <section className="firstP">
            <p>
              In coding, every problem is an opportunity to find a solution and
              every solution is a chance to improve.
            </p>
          </section>
          {!authServiceInstance.isAuthenticated(currentUser) && (
            <div className="buttons-container">
              <button
                className="signIn submitBtn"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Sign In
              </button>
              <button
                className="register submitBtn"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="section-container2">
        <div className="start">
          <header>
            <h1>It is not a pipeline problem.</h1>
          </header>
          <section>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum
              dicta magni delectus repudiandae facilis nam quo! Amet voluptates
              aliquid atque debitis? Odio, saepe aperiam molestiae quos tempora
              obcaecati. Ducimus, quis?
            </p>
          </section>
        </div>
      </div>

      <div className="section-container1">
        <div className="vl"></div>
        <div className="section coding-tests-section">
          <section>
            <ul className="section2">
              <li>
                Focus on what really<br></br> matters
              </li>
            </ul>
            <p className="section2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum
              dicta magni delectus repudiandae facilis nam quo! Amet voluptates
              aliquid atque debitis? Odio, saepe aperiam molestiae quos tempora
              obcaecati. Ducimus, quis?
            </p>
            <img src={pic} alt="Pic" />
          </section>
        </div>
      </div>

      <div className="section-container1">
        <div className="vl"></div>
        <div className="section coding-tests-section">
          <section>
            <ul className="section2">
              <li>
                Focus on what really<br></br> matters
              </li>
            </ul>
            <p className="section2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum
              dicta magni delectus repudiandae facilis nam quo! Amet voluptates
              aliquid atque debitis? Odio, saepe aperiam molestiae quos tempora
              obcaecati. Ducimus, quis?
            </p>
            <img src={pic} alt="Pic" />
          </section>
        </div>
      </div>

      <div className="section-container2">
        <div className="start">
          <header>
            <h1>It is not a pipeline problem.</h1>
          </header>
          <section>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum
              dicta magni delectus repudiandae facilis nam quo! Amet voluptates
              aliquid atque debitis? Odio, saepe aperiam molestiae quos tempora
              obcaecati. Ducimus, quis?
            </p>
          </section>
          <div className="buttons-container">
            <button
              className="signIn submitBtn"
              onClick={() => {
                navigate("/problemSet");
              }}
            >
              Start
            </button>
          </div>
        </div>
      </div>

      <div className="carousel">
        <div>
          <div className="carousel-content">
            <span>Ultra Judge</span>
            <h1>ABOUT US</h1>
            <hr />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum hic
              libero numquam consequatur saepe dolorem eligendi quis a,
              perferendis quia aliquid nesciunt deserunt cumque error explicabo
              animi rerum voluptatibus nemo?
            </p>
          </div>
        </div>
        <Swiper
          className="myswiper"
          modules={[Pagination, EffectCoverflow, Autoplay]}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 3,
            slideShadows: true,
          }}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
            },
            1560: {
              slidesPerView: 3,
            },
          }}
        >
          {slider.map((data) => (
            <SwiperSlide
              style={{ backgroundImage: `url(${data.img})` }}
              className="myswiper-slider"
            >
              <div>
                <h2>{data.title}</h2>
                <p>{data.description}</p>
                <a href={`${data.img}`} target="_blank" className="slider-btn">
                  explore
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <footer className="footer">
        <div className="social-icons">
          <a href="https://www.facebook.com">
            <Facebook />
          </a>
          <a href="https://mail.google.com">
            <Google />
          </a>
          <a href="https://www.linkedin.com">
            <LinkedIn />
          </a>
        </div>
        <Typography
          variant="body2"
          align="center"
          color="textSecondary"
          className="copy"
        >
          &copy; 2023 Your Company. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
};

export default Home;
