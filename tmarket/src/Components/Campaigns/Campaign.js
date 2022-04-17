import React from "react";

import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import "./Campaign.css";
import DialogBox from "../DialogBox";
import swal from "@sweetalert/with-react";

function Campaign() {
  let segmentsArray = [];
  let segmentsArrayId = [];
  let currentUser;
  const [type, setType] = useState("");
  const [segmentName, setSegmentName] = useState("");
  const [segmentId, setSegmentId] = useState(0);
  const [segsArray, setSegsArray] = useState([]);
  const [segsArrayId, setSegsArrayId] = useState([]);
  const [user, setUser] = useState(0);

  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const [open, setOpen] = React.useState(false);

  // const url = "http://127.0.0.1:8000/api/"
  const url = "https://tmt-be-urtjok3rza-wl.a.run.app/api/"
  
  const [responseGlobal, setResponseGlobal] = React.useState({
    Message: "Value added succesfully",
  });
  const [responseTitle, setResponseTtile] = React.useState("Success");

  const submitCampaign = async (e) => {
    e.preventDefault();

    let flag = false;
    if (name == "") {
      document.getElementById("campaign-name").style.visibility = "visible";
      flag = true;
    }
    if (type == "") {
      document.getElementById("campaign-type").style.visibility = "visible";
      flag = true;
    }
    if (msg == "") {
      document.getElementById("campaign-msg").style.visibility = "visible";
      flag = true;
    }
    if (segmentId == 0) {
      document.getElementById("campaign-segment").style.visibility = "visible";
      flag = true;
    }
    if (flag) return;

    const response = await fetch(url+"createCampaign/", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "*/*" },
      credentials: "include",
      withCredentials: true,
      body: JSON.stringify({
        name: name,
        msg: msg,
        type: type,
        user: user.id,
        segment: segmentId,
      }),
    });
    console.log(response.status);
    

    if (response.status == 400) {
      // const result = await response.json();

      // setResponseGlobal(result)
      // setResponseTtile("Oops!!")
      // setOpen(true)
      swal({
        title: "Oops",
        text: "Something went wrong",
        icon: "warning",
        buttons: false,
      });
    } else if (response.status == 200) {
      console.log("Segment Id",segmentId)
      const response2 = await fetch(
        url+"sendmsg/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "*/*" },

          body: JSON.stringify({
            "@type": "MessageCard",
            "@context": "http://schema.org/extensions",
            themeColor: "0076D7",
            summary: "Lord Dipanshu  created a new task",
            sections: [
              {
                activityTitle: name,
                activitySubtitle: msg,
                activityImage:
                  "https://teamsnodesample.azurewebsites.net/static/img/image5.png",
              },
            ],
            "segment":segmentId
          }),
        },
        { mode: "cors" }
      );

      // setOpen(true)
      //     setResponseTtile("Success!!")
      //     setResponseGlobal({"Message":"Value added succesfully"})
      //     console.log(name)
      swal({
        title: "Done!",
        text: "Campaign created succesfully",
        icon: "success",
        buttons: false,
      });
      document.getElementById("form-createSegment").reset();
    } else {
      setResponseTtile("Oops!!");
      setResponseGlobal({ Message: "Unknown error" });
    }

    //   const content = await response.json();

    //   console.log(content)

    // console.log(response2)
  };

  const getSegments = async () => {
    const response = await fetch(url+"user", {
      method: "GET",
      credentials: "include",
    });

    currentUser = await response.json();
    setUser(currentUser);

    const response2 = await fetch(
      url+"getAllSegments/" + currentUser.id,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const segments = await response2.json();
    console.log(segments);
    for (let key in segments) {
      if (segments.hasOwnProperty(key)) {
        segmentsArrayId.push(segments[key].id);
        segmentsArray.push(segments[key].name);
      }
    }
    console.log("here" + segmentsArrayId);
    setSegsArray(segmentsArray);
    setSegsArrayId(segmentsArrayId);
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
    // console.log(type);
    // console.log(currentUser);
    // console.log(segmentsArray);
  };

  const handleChangeSegment = (event) => {
    event.preventDefault();
    // console.log('hi'+event.target.value)
    let index = segsArray.indexOf(event.target.value);

    // console.log('h id '+segsArrayId[index])
    // console.log('h id '+segsArray[index])

    setSegmentId(segsArrayId[index]);
    setSegmentName(segsArray[index]);
  };

  useEffect(() => {
    getSegments();
  }, []);

  useEffect(() => {
    setSegsArray(segsArray);
    console.log("Segs Array " + segsArray);
  }, [segsArray]);

  useEffect(() => {
    setSegsArrayId(segsArrayId);
    console.log("Segs Array Id " + segsArrayId);
  }, [segsArrayId]);

  useEffect(() => {
    setSegmentName(segmentName);
  }, [segmentName]);

  useEffect(() => {
    setSegmentId(segmentId);
    document.getElementById("campaign-segment").style.visibility = "hidden";
    console.log("Seg id" + segmentId);
  }, [segmentId]);

  useEffect(() => {
    document.getElementById("campaign-name").style.visibility = "hidden";
  }, [name]);
  useEffect(() => {
    document.getElementById("campaign-type").style.visibility = "hidden";
  }, [type]);
  useEffect(() => {
    document.getElementById("campaign-msg").style.visibility = "hidden";
  }, [msg]);

  return (
    <div>
      <Sidebar home={true} />
      <div className="container-campaign">
        <h2>Create a Campaign</h2>
        <form id="form-create-campaign">
          <FormControl fullWidth>
            <InputLabel id="heading-message-label" className="set-margin">
              Type of Message
            </InputLabel>
            <Select
              labelId="heading-message-label"
              id="heading-message-select"
              value={type}
              label="Type of Message"
              defaultValue=""
              onChange={handleChangeType}
              className="set-width set-margin"
              required
            >
              <MenuItem value="Teams_msg">MS Teams Message</MenuItem>
            </Select>
            <label
              id="campaign-type"
              style={{ visibility: "hidden", color: "red" }}
            >
              *This field is required
            </label>

            <TextField
              id="outlined-basic"
              label="Message Tittle"
              variant="outlined"
              className="set-width"
              style={{ marginTop: "20px" }}
              onChange={(e) => setName(e.target.value)}
            />
            <label
              id="campaign-name"
              style={{ visibility: "hidden", color: "red" }}
            >
              *This field is required
            </label>

            <TextareaAutosize
              aria-label="minimum height"
              id="outlined-basic"
              minRows={4}
              // variant="outlined"
              placeholder="Enter Message"
              className="set-width message"
              style={{ marginTop: "20px", fontFamily: "sans-serif" }}
              onChange={(e) => setMsg(e.target.value)}
            />
            <label
              id="campaign-msg"
              style={{ visibility: "hidden", color: "red" }}
            >
              *This field is required
            </label>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="heading-segment-label" className="set-margin">
              Select segment
            </InputLabel>

            <Select
              labelId="heading-segment-label"
              id="heading-segment-select"
              label="Select Segment"
              onChange={handleChangeSegment}
              name="followers"
              fullWidth
              required
              defaultValue=""
              className="set-width"
              style={{ marginTop: "20px", width: "45%" }}
            >
              {segsArray.map((item, index) => {
                return (
                  <MenuItem key={index} value={segsArray[index]}>
                    {" "}
                    {segsArray[index]}{" "}
                  </MenuItem>
                );
              })}
            </Select>
            <label
              id="campaign-segment"
              style={{ visibility: "hidden", color: "red" }}
            >
              *This field is required
            </label>

            <Button
              variant="contained"
              style={{ marginTop: "20px", width: "45%" }}
              onClick={submitCampaign}
            >
              Send Message
            </Button>
          </FormControl>
        </form>
      </div>
      <DialogBox
        open={open}
        func={setOpen}
        response={responseGlobal}
        title={responseTitle}
      />
    </div>
  );
}
//name msg type user segment
export default Campaign;
