import React from "react";
import Sidebar from "../Sidebar/Sidebar";

import { useEffect, useState } from "react";
import "./Segments.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogBox from "../DialogBox";
import swal from '@sweetalert/with-react'

function Segments() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [open, setOpen] = React.useState(false);
  const [responseGlobal, setResponseGlobal] = React.useState({"Message":"Value added succesfully"});
  const [responseTitle, setResponseTtile] = React.useState("Success");


  // const url = "http://127.0.0.1:8000/api/"
  const url = "https://tmt-be-urtjok3rza-wl.a.run.app/api/"
  const usage_table_cols = [
    "added_to_carts_count",
    "duration",
    "purcharsed_items_count",
    "purchased_items",
  ];
  const customer_table_cols = [
    "age",
    "city",
    "country",
    "gender",
    "occupation",
    "phone",
    "prefferedLanguage",
    "state",
  ];
  const cart_items_cols = ["product_namec", "quantityc", "typec"];
  const purchased_items_cols = ["product_namep", "quantityp", "typep"];

  const createSegment = async () => {
    let currentUser;
    const response = await fetch(url+"user", {
      method: "GET",
      credentials: "include",
    });

    currentUser = await response.json();

    let flag =false;
    if( name==""){
      console.log(name);
      document.getElementById('segment-name').style.visibility = "visible";
      flag=true;
    }
    if( type==""){
      
      document.getElementById('segment-type').style.visibility = "visible";
      flag=true;
    }
    if( value==""){
     
      document.getElementById('segment-value').style.visibility = "visible";
      flag=true;
    }
    if(flag){
      return ;
    }

    const response2 = await fetch(
      url+"addSegments/" + currentUser.id,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        withCredentials: true,
        body: JSON.stringify({
          name: name,
          type: type,
          value: value,
        }),
      }
    );
   
    if( response2.status == 400)
    {
      const result = await response2.json();
      console.log(result)
      // setResponseGlobal(result)
      // setResponseTtile("Oops!!")
      // setOpen(true)
      swal({
        title: "Oops",
        text: "No customer available for such segment",
        icon: "warning",
        buttons: false,
      });
    }
    else if( response2.status == 201 ){
      // setOpen(true)
      // setResponseTtile("Success!!")
      // setResponseGlobal({"Message":"Value added succesfully"})
      swal({
        title: "Done!",
        text: "Segment added succesfully",
        icon: "success",
        buttons: false,
      });
      console.log(name)
      document.getElementById("form-createSegment").reset();

    }
    else{
      // setResponseTtile("Oops!!")
      // setResponseGlobal({"Message": "Server Side error"})
      swal({
        title: "Oh no!",
        text: "Bad data found",
        icon: "error",
      });
    }

  };

  useEffect(()=>{
    document.getElementById('segment-name').style.visibility = "hidden";
  },[name])
  useEffect(()=>{
    document.getElementById('segment-type').style.visibility = "hidden";
  },[type])
  useEffect(()=>{
    document.getElementById('segment-value').style.visibility = "hidden";
  },[value])

  return (
    <div>
      <Sidebar home={true}></Sidebar>
      <div className="container-segment">
        <h2>Create a Segment</h2>
        <form id ='form-createSegment'>
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label="Segment Name"
            variant="outlined"
            className="set-width"
            style={{ marginTop: "20px" }}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label  id="segment-name" style={{'visibility' :"hidden",'color' : 'red'}}>*This field is required</label>
          <FormControl fullWidth>
            <InputLabel id="heading-message-label" className="set-margin">
              Basis of Segment
            </InputLabel>

            <Select
              labelId="heading-message-label"
              id="heading-message-select"
              value={type}
              label="Type of Message"
              defaultValue=""
              onChange={(e) => setType(e.target.value)}
              className="set-width set-margin"
              required
            >
              {usage_table_cols.map((item, index) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
              {customer_table_cols.map((item, index) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
              {cart_items_cols.map((item, index) => {
                return (
                  <MenuItem value={item}>
                    {item.slice(0, -1)} (In Cart)
                  </MenuItem>
                );
              })}
              {purchased_items_cols.map((item, index) => {
                return (
                  <MenuItem value={item}>
                    {item.slice(0, -1)} (In Purchased)
                  </MenuItem>
                );
              })}
            </Select>
            <label  id="segment-type" style={{'visibility' :"hidden",'color' : 'red'}}>*This field is required</label>
          </FormControl>

          <TextField
            id="outlined-basic"
            label="Value for segment"
            variant="outlined"
            className="set-width"
            style={{ marginTop: "20px" }}
            onChange={(e) => setValue(e.target.value)}
            required
          />
  <label  id="segment-value" style={{'visibility' :"hidden",'color' : 'red'}}>*This field is required</label>
          <Button 
            variant="contained"
            style={{ marginTop: "20px", width: "45%" }}
            onClick={createSegment}
          >
            Submit
          </Button>
        </FormControl>
        </form>
      </div>
      <DialogBox open={open} func={setOpen} response={responseGlobal} title={responseTitle}/>
    </div>
  );
}

export default Segments;
