import "./Home.css";
import Sidebar from "../Sidebar/Sidebar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

import React from "react";

function Home() {
  const navigate = useNavigate();

  const gotoAnalytics = () => {
    navigate("/analytics");
  };

  const gotoCampaigns = () => {
    navigate("/campaign/view");
  };

  const gotoSegments = () => {
    navigate("/segments/view");
  };

  return (
    <div className="container_home">
      <Sidebar home={true}></Sidebar>

      <div className="header_home">
        <h1>Dashboard</h1>
      </div>

      <div className="cards_home">
        <Grid sx={{ flexGrow: 1 }} container spacing={1}>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Card
                className="card_home card"
                sx={{ maxWidth: 345 }}
                onClick={gotoAnalytics}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={require("../../assets/analytics.png")}
                    alt="analytics"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <b>Analytics</b>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Understand who your more likely customers are, retain
                      them, increase customer lifetime value by proactively
                      relating to the customers and deliver the right message at
                      the right time just with a single click.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid sx={{ flexGrow: 1 }} container spacing={1}>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Card
                className="card"
                sx={{ maxWidth: 345 }}
                onClick={gotoSegments}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={require("../../assets/segments.jpeg")}
                    // src='./assets/analytics.png'
                    alt="Segments"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <b>Segments</b>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Create segments for your targeted marketing from
                      demographics, geographics, psychographics and much more in
                      a single click and make your marketing campaign most
                      relevant and stand apart from others.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid sx={{ flexGrow: 1 }} container spacing={1}>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Card
                className="card"
                sx={{ maxWidth: 345 }}
                onClick={gotoCampaigns}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={require("../../assets/campaigns.jpeg")}
                    // src='./assets/analytics.png'
                    alt="campaigns"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <b>Campaigns</b>
                    </Typography>
                    <Typography    variant="body2" color="text.secondary">
                      Starting from planning through development and management
                      make your best marketing campaigns to drive enormous
                      engagement, conversions, traffic, and revenue to get your
                      business to new heigths.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Home;
