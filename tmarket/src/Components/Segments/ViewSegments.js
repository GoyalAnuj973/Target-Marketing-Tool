import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Sidebar from "../Sidebar/Sidebar";
import "./ViewSegments.css";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "@sweetalert/with-react";

function ViewSegments() {
  const [segments, setsegments] = React.useState([{}]);
  const [segmentsGlobal, setSegmentsGlobal] = React.useState([{}]);

  // const url = "http://127.0.0.1:8000/api/"
  const url = "https://tmt-be-urtjok3rza-wl.a.run.app/api/";
  const navigate = useNavigate();

  const setsegmentsOnUI = async () => {
    let currentUser;
    const response = await fetch(url + "user", {
      method: "GET",
      credentials: "include",
    });

    currentUser = await response.json();

    const response2 = await fetch(url + "getAllSegments/" + currentUser.id, {
      method: "GET",
      credentials: "include",
    });

    const temp = await response2.json();
    // console.log(temp.reverse());
    temp.reverse()
    setSegmentsGlobal(temp.reverse());
    setsegments(temp.reverse());
  };

  const search = (e) => {
    let currentSearch = e.target.value;
    if (currentSearch == "") {
      setsegments(segmentsGlobal);
      return;
    }
    let newResults = [];
    segmentsGlobal.forEach((item) => {
      if (item.name.includes(currentSearch)) {
        newResults.push(item);
      }
    });
    setsegments(newResults);
  };

  const gotoCreate = () => {
    navigate("/segments/create");
  };

  const delItem = async (item)=>{
    const response = await fetch(url + "removeSegment/" + item.id, {
      method: "DELETE",
      credentials: "include",
    });
    console.log(response.status)
    if(response.status == 200|| response.status ==204){
      swal("Poof! Segment is deleted!", {
        icon: "success",
      });
      let newList = [];
      segments.forEach((item2) => {
        if (item.id !== item2.id) newList.push(item2);
      });
      setsegments(newList);

    }
      else{
        swal("Unexpected error occurred", {
          icon: "error",
        });
      }
    
  }

  const del = async (item) => {
   
    await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      console.log(willDelete);
      if (willDelete) {
        console.log("Initai")
       delItem(item);

      
      } else {
        console.log("yo")
        return;
      }
    });

    // setSegmentsGlobal(newList)
  };

  React.useEffect(() => {
    setsegmentsOnUI();
  }, []);

  return (
    <div>
      <Sidebar home={true}></Sidebar>

      <h1 className="header">View Segments</h1>

      <div className="align-right-segment">
        <TextField
          className="search-segment"
          id="input-with-icon-textfield"
          placeholder="Search by Segment name"
          onChange={search}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <Button
          variant="contained"
          className="create-segment"
          align="right"
          onClick={gotoCreate}
        >
          <strong>Create Segment</strong>
        </Button>
      </div>

      <div className="cardclass_viewsegments">
        {/* <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {segments.map((item) => {
            return (
              <Grid item xs={12} sm={6} md={3}>
                <Card className="card_viewsegments" sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Name :{item?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Basis of Segment:{item?.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Value :
                      {item?.value == "M"
                        ? "Male"
                        : item?.value == "F"
                        ? "Female"
                        : item?.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Number of Customers :{item?.customer?.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid> */}

        <TableContainer
          sx={{ maxHeight: 540, maxWidth: "100%", marginTop: "20px" }}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{
              maxWidth: "90%",
              marginLeft: "auto",
              marginTop: "auto",
              marginRight: "auto",
            }}
          >
            <TableHead>
              <TableRow className="title-row">
                <TableCell className="title-row">Name </TableCell>
                <TableCell className="title-row">Basis of Segment </TableCell>
                <TableCell className="title-row">Value </TableCell>
                <TableCell className="title-row">Number of Customers</TableCell>
                <TableCell className="title-row">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {segments.map((item, index) => {
                return (
                  <TableRow key={index} className="table-row">
                    <TableCell className="table-row">{item?.name}</TableCell>
                    <TableCell className="table-row">{item?.type}</TableCell>
                    <TableCell className="table-row">
                      {item?.value == "M"
                        ? "Male"
                        : item?.value == "F"
                        ? "Female"
                        : item?.value}
                    </TableCell>
                    <TableCell className="table-row">
                      {item?.customer?.length}
                    </TableCell>
                    <TableCell
                      className="table-row"
                      onClick={() => {
                        del(item);
                      }}
                    >
                      <DeleteIcon style={{ color: "rgb(25,118,210)" }} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ViewSegments;
