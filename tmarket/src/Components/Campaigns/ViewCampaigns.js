import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Sidebar from "../Sidebar/Sidebar";
import Grid from "@mui/material/Grid";
import './ViewCampaigns.css'
import Button from "@mui/material/Button";

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "@sweetalert/with-react";


function ViewCampaigns() {
  const [campaigns, setCampaigns] = React.useState([{}]);
  const [campaignsGlobal, setCampaignsGlobal] = React.useState([{}]);
  const navigate = useNavigate();

  // const url = "http://127.0.0.1:8000/api/"
  const url = "https://tmt-be-urtjok3rza-wl.a.run.app/api/"
  const setCampaignsOnUI = async () => {
    let currentUser;
    const response = await fetch(url+"user", {
      method: "GET",
      credentials: "include",
    });

    currentUser = await response.json();

    const response2 = await fetch(
      url+"getCampaignOfUser/" + currentUser.id,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const temp = await response2.json();
    temp.reverse()
    setCampaigns(temp.reverse());

    setCampaignsGlobal(temp.reverse());
  };


  const search = (e)=>{
   let currentSearch = e.target.value;
      if(currentSearch=='')
      {
        setCampaigns(campaignsGlobal);
        return;
      }
      let newResults = []
    campaignsGlobal.forEach((item)=>{
      if( item.name.includes(currentSearch)){
        newResults.push(item)
      }
    })
    setCampaigns(newResults)
  }


  const gotoCreate = () => {
    navigate("/campaign/create");
  };

  React.useEffect(() => {
    setCampaignsOnUI();
  }, []);


  const delItem = async (item)=>{
    const response = await fetch(url + "removeCampaign/" + item.id, {
      method: "DELETE",
      credentials: "include",
    });
    console.log(response.json())
    if(response.status == 200|| response.status ==204){

        
      swal("Poof! Campaign is deleted!", {
        icon: "success",
      });
      console.log("clicked id", item.id);
      let newList = [];
      campaigns.forEach((item2) => {
        if (item.id !== item2.id) newList.push(item2);
      });
      setCampaigns(newList);
    }
      else{
        swal("Unexpected error occurred", {
          icon: "error",
        });
      }
     
  }

  const del = async (item) => {
   
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this campaign!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
       delItem(item);

       

        

      
        
      } else {
        return;
      }
    });

    // setSegmentsGlobal(newList)
  };


  return (
    <div className="container">
      <Sidebar home={true}></Sidebar>

      <h1 className="header">View Campaign</h1>

      <div className="align-right-campaign">

      <TextField
        id="input-with-icon-textfield"
        placeholder="Search by Campaign "
        onChange={search}
        className="search-campaign"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    

      <Button variant="contained" className="create-campaign"  align="right" onClick={gotoCreate}>
        <strong>Create Campaign</strong>
        </Button>
      </div>
      <div className="cardclass_viewcampaigns">
        {/* <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          className="cards"
        >
          {campaigns.map((item) => {
            return (
              <Grid item xs={12} sm={6} md={3}>
                <Card className="card_viewcampaign" sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Name :{item?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      MSG:{item?.msg}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Type :{item?.type}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid> */}
        <TableContainer sx={{maxHeight: 540,maxWidth:'100%', marginTop:'20px' }}>
          <Table stickyHeader aria-label="sticky table" sx={{  maxWidth: '90%', marginLeft:'auto', marginTop:'auto', marginRight:'auto', boxShadow: '4'}} >
            <TableHead >
              <TableRow className="title-row">
                <TableCell className="title-row">Name </TableCell>
                <TableCell className="title-row">Message </TableCell>
                <TableCell className="title-row">Type </TableCell>
                <TableCell className="title-row">Actions </TableCell>
              </TableRow>
            </TableHead>

          <TableBody >
            {campaigns.map((item)=>{
              return (<TableRow className="table-row">
                  <TableCell className="table-row">{item?.name}</TableCell>
                  <TableCell className="table-row">{item?.msg}</TableCell>
                  <TableCell className="table-row">{item?.type}</TableCell>
                  <TableCell className="table-row" onClick={() => { del(item); }}><DeleteIcon style={{ color: "rgb(25,118,210)" }}/></TableCell>
              </TableRow>)
            })}

          </TableBody>


          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ViewCampaigns;
