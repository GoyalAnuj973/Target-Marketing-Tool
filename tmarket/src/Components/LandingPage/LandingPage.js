/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./LandingPage.css";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const gotoLogin = () => {
    navigate("/login");
  };

  return (
    <div className="landingPage">
      <div className="nav">
        <img
          src={require("../../assets/logos.png")}
          width="180"
          className="logo-LandingPage"
        />

        <Button
          variant="contained"
          className="login-button"
          align="right"
          onClick={gotoLogin}
        >
          Login
        </Button>
      </div>

      {/* <img src={require("../../assets/logos.png")} alt="logo" />
       
        <img
          src={require("../../assets/logos.png")}
          width="180"
          className="logo"
        /> */}

      <div className="container-LandingPage">
        <div className="image-1">
          <img
            src={require("../../assets/landingpageimage.jpg")}
            width="1000"
            height="700"
          />
        </div>
        <div className="content">
          <h1>
            Target Marketing Platform.
            <br /> Trusted And Used By Global Brands
          </h1>
          <ul className="list-items">
            <li>
              <p>
                <span className="text">
                  <strong>All-in-one platform:</strong>
                  "Get behavioral analytics, audience segmentation, and
                  cross-channel messaging in a single platform. customers have
                  reduced uninstalls by 30% and improved retention by 5x."
                </span>
              </p>
            </li>
            <li>
              <p>
                <span className="text">
                  <strong>Boost engagement across touchpoints:</strong>
                  "Deliver a seamless omnichannel experience at every lifecycle
                  stage with messaging campaigns across 12 channels including
                  push, email, in-app, MSTeams, and more."
                </span>
              </p>
            </li>
            <li>
              <p>
                <span className="text">
                  <strong>Real-time audience analytics:</strong>
                  "From descriptive analysis to profile data and uninstall
                  tracking, our platform is jam-packed with all the behavioral
                  analytics you could hope for."
                </span>
              </p>
            </li>
            <li>
              <p>
                <span className="text">
                  <strong>Individualization at scale:</strong>
                  "Connect data in meaningful ways to personalize messages,
                  accelerate product discovery with predictive recommendations,
                  and build automated campaigns."
                </span>
              </p>
            </li>
            <li>
              <p>
                <span className="text">
                  <strong>Built for speed, security, and scale:</strong>
                  "We can a lot of data points and send messages every day."
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
