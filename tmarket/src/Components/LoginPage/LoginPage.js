import React from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./loginpage.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import swal from "@sweetalert/with-react";
import { maxHeight } from "@mui/system";


function LoginPage() {

const navigate = useNavigate();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


// const url = "http://127.0.0.1:8000/api/"
const url = "https://tmt-be-urtjok3rza-wl.a.run.app/api/"

const submit = async (e) => {
  e.preventDefault();

  const response = await fetch(url+'login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify({
          email,
          password
      })
  });
  console.log(JSON.stringify({
    email,
    password
  }));
    const content = await response.json();

   if( content.jwt !==undefined){
      navigate('/home')
   }
   else{
    swal({
      title: "Uh oh",
      text: "Wrong email or password",
      icon: "error",
      buttons: false,
    });
   }
    console.log('Hi '+content.jwt);
}


const newUser = ()=>{
  navigate('/signup')
}

  return (
    <div className="container-login">
    
      <div className="cardbox">
        <div class="leftside-login">
            {/* <div className="display-block">
              <img src={require("../../assets/logo-2.png")} alt="missing img" />
              <h2 className="heading">  Target Marketing</h2>
            </div> */}
            <br />
            <div className="login-title">
              <h1>Login</h1>
            </div>
            <div className="description">
              <p>See your growth<br/>
              Get insights in a single click !!
              </p>
            </div>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 2, width: "30ch" },
              }}
              noValidate
              autoComplete="off"
            >
            
              <div className="input">
                <TextField
                  className="increase-width increase-margin"
                  id="outlined-basic"
                  label="Email"
                  align ="right"
                  variant="outlined"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input">
                <TextField
                  className="increase-width increase-margin"
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  text-align="center"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
            </Box>
            <div className="forgot">
            <Button className="forgot-password">
              Forgot Password?
            </Button>
            </div>

            <Button variant="contained" className="button-placement-login" onClick={submit} align="left">
              Login
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              className="increase-margin1"
            >
              Not registered yet?&nbsp;&nbsp;
              <span className="purpleColor "onClick={newUser}>Create an Account</span>
            </Typography>
        
        </div>

        <div className="imageConatiner">
          <div className="rightsideimg-login">
            <div className="display-block">
              <img src={require("../../assets/logo-1.png")} alt="missing img" />
              {/* */}
            </div>
            
            <div>
            <h1 className="heading"> Increase your Sales and Understand your Customers Better!</h1> 
            <p className="sub-heading">With The best Target Marketing Tool in the Industry</p>
            </div>
            <img className="image" src={require("../../assets/photo.png")}></img>
          </div>
         
        </div>

      </div>

    </div>
  );
}

export default LoginPage;
