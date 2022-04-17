import React from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import swal from "@sweetalert/with-react";

function Signup() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompany] = useState("");
  const [redirect, setRedirect] = useState(false);

  const url = "https://tmt-be-urtjok3rza-wl.a.run.app/api/";

  const navigate = useNavigate();
  const gotoLogin = () => {
    navigate("/login");
  };
  const submit = async (e) => {
    e.preventDefault();

    let flag = false;

    if (username == "") {
      document.getElementById("signup-username").style.visibility = "visible";
      flag = true;
    }
    if (email == "") {
      document.getElementById("signup-email").style.visibility = "visible";
      flag = true;
    }
    if (password == "") {
      document.getElementById("signup-password").style.visibility = "visible";
      flag = true;
    }
    if (companyName == "") {
      document.getElementById("signup-companyName").style.visibility =
        "visible";
      flag = true;
    }
    if (flag) {
      return;
    }

    const response = await fetch(url + "signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
        companyName,
      }),
    });
    console.log(
      JSON.stringify({
        email,
        password,
        username,
        companyName,
      })
    );

    console.log(response.status);
    if (response.status == 200) {
      swal("Account created Successfully", {
        icon: "success",
      });

      navigate("/login");
    } else {
      const content = await response.json();
      console.log(content);
      swal(content?.username[0] + "\n" + content?.email[0], {
        icon: "error",
      });
    }
  };

  return (
    <div className="container">
      <Card sx={{ height: 895, maxWidth: 1940, maxHeight: 2000 }}>
        <div className="cardbox-signup">
          <div class="leftside-signup">
            <CardContent>
              <Typography
                gutterBottom
                variant="h2"
                align="center"
                component="div"
                className="margin Signup"
              >
                Signup
              </Typography>
              <Typography
                variant="body2"
                align="center"
                color="text.secondary"
                className="margin description"
              >
                See your growth
                <br />
                Get insights in a single click !!
              </Typography>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 2, width: "30ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    className="increase-width increase-margin"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <label
                  id="signup-email"
                  style={{
                    visibility: "hidden",
                    color: "red",
                    "margin-left": "15%",
                  }}
                >
                  *This field is required
                </label>
                <div>
                  <TextField
                    className="increase-width increase-margin"
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <label
                  id="signup-username"
                  style={{
                    visibility: "hidden",
                    color: "red",
                    "margin-left": "15%",
                  }}
                >
                  *This field is required
                </label>
                <div>
                  <TextField
                    className="increase-width increase-margin"
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <label
                  id="signup-password"
                  style={{
                    visibility: "hidden",
                    color: "red",
                    "margin-left": "15%",
                  }}
                >
                  *This field is required
                </label>
                <div>
                  <TextField
                    className="increase-width increase-margin"
                    id="outlined-basic"
                    label="Company Name"
                    variant="outlined"
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <label
                  id="signup-companyName"
                  style={{
                    visibility: "hidden",
                    color: "red",
                    "margin-left": "15%",
                  }}
                >
                  *This field is required
                </label>
              </Box>

              {/* <Typography
              variant="body2"
              color="rgb(81,56,238)"
              align="center"
              className="forgot"
            >
              Forgot Password?&nbsp;&nbsp;
            </Typography> */}
              <Button
                variant="contained"
                className="button-placement-signup"
                onClick={submit}
              >
                Signup
              </Button>
              <Typography
                variant="body2"
                color="text.secondary"
                className="increase-sign"
                marginLeft={55}
                marginTop={1}
              >
                Already have an Account?&nbsp;&nbsp;
                <span className="purpleColor" onClick={gotoLogin}>
                  Log in
                </span>
              </Typography>
            </CardContent>
          </div>

          <div className="imageConatiner">
            <div className="rightsideimg-signup">
              <div className="display-block">
                <img
                  src={require("../../assets/logo-1.png")}
                  alt="missing img"
                />
                {/* */}
              </div>
              <div>
                <h1 className="heading">
                  {" "}
                  Increase your Sales and Understand your Customers Better!
                </h1>
                <p className="sub-heading">
                  With The best Target Marketing Tool in the Industry
                </p>
              </div>
              <img
                className="image"
                src={require("../../assets/photo.png")}
              ></img>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Signup;
