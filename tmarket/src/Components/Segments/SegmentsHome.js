import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import "./SegmentsHome.css";
import { Navigate, useNavigate } from "react-router-dom";

function SegmentsHome() {
  const navigate = useNavigate();
  const gotoCreate = () => {
    navigate("create");
  };
  const gotoView = () => {
    navigate("view");
  };

  return (
    <div>
      <Sidebar home={true}></Sidebar>
      <div className="container_segmentshome">
        <Card className="card_segmentshome" sx={{ maxHeight: 300 }} onClick={gotoCreate}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={require("../../assets/segments.jpeg")}
              alt="green iguana"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Create Segments
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className="card_segmentshome" sx={{ maxHeight: 300 }} onClick={gotoView}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={require("../../assets/segments.jpeg")}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                View Segments
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}

export default SegmentsHome;
