import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import "./Analytics.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

//sx={{ maxWidth: 500 }}

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};


function Analytics() {
  const [campsArray, setCampsArray] = useState([]);
  const [campsArrayChanged, setCampsArrayChanged] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customersChanged, setCustomersChanged] = useState(false);
  const [segmentsChanged, setSegmentsChanged] = useState(false);
  const [segments, setsegments] = React.useState([]);
  const [purchasedItem, setPurchasedItem] = React.useState([]);
  const [cartItem, setCartItem] = React.useState([]);

  const [user, setUser] = useState();

  // const url = "http://127.0.0.1:8000/api/"
  const url = "https://tmt-be-urtjok3rza-wl.a.run.app/api/"
  const getUser = async () => {
    let currentUser;
    const response = await fetch(url+"user", {
      method: "GET",
      credentials: "include",
    });

    currentUser = await response.json();
    setUser(currentUser);
  };

  const getCampaigns = async () => {
    if (user === undefined) return;
    const response2 = await fetch(
      url+"getCampaignOfUser/" + user.id,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const campaigns = await response2.json();
    console.log(campaigns);
    setCampsArray(campaigns);
    setCampsArrayChanged(true);
  };

  const getSegments = async () => {
    if (user === undefined) return;

    const response3 = await fetch(
      url+"getAllSegments/" + user.id,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const temp1 = await response3.json();

    setsegments(temp1);
    setSegmentsChanged(true);
  };

  const getCustomers = async () => {
    if (user === undefined) return;

    const response = await fetch(
      url+"getCustomerOfUser/" + user.id,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const temp = await response.json();

    setCustomers(temp);
    setCustomersChanged(true);
  };

  const getPurchasedItems = async () => {
    if (user === undefined) return;

    const response = await fetch(
      url+"getPurchasedItem/",
      {
        method: "GET",
        credentials: "include",
      }
    );

    const temp = await response.json();
    console.log("Purchased", temp);

    setPurchasedItem(temp);
  };

  const getCartItems = async () => {
    if (user === undefined) return;

    const response = await fetch(
      url+"getCartItemsOfUser/" + user.id,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const temp = await response.json();
    console.log("CAart", temp);

    setCartItem(temp);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getCampaigns();
    getSegments();
    getCustomers();
    getPurchasedItems();
    getCartItems();
  }, [user]);

  const getCityObject = () => {
    let obj = {};
    customers.forEach((item) => {
      obj[item.city] = obj[item.city] === undefined ? 1 : obj[item.city] + 1;
    });
    // console.log(obj);
    return obj;
  };
  const getAgeObject = () => {
    let obj = {};
    customers.forEach((item) => {
      obj[item.age] = obj[item.age] === undefined ? 1 : obj[item.age] + 1;
    });
    return obj;
  };
  const getGenderObject = () => {
    let obj = {};
    customers.forEach((item) => {
      obj[item.gender] =
        obj[item.gender] === undefined ? 1 : obj[item.gender] + 1;
    });
    // console.log(obj);
    return obj;
  };

  const getOccupationObject = () => {
    let obj = {};
    customers.forEach((item) => {
      obj[item.occupation] =
        obj[item.occupation] === undefined ? 1 : obj[item.occupation] + 1;
    });
    // console.log(obj);
    return obj;
  };
  const getStateObject = () => {
    let obj = {};
    customers.forEach((item) => {
      obj[item.state] = obj[item.state] === undefined ? 1 : obj[item.state] + 1;
    });
    // console.log(obj);
    return obj;
  };
  const getCountryObject = () => {
    let obj = {};
    customers.forEach((item) => {
      obj[item.country] =
        obj[item.country] === undefined ? 1 : obj[item.country] + 1;
    });
    // console.log(obj);
    return obj;
  };

  const cityData = {
    labels: Object.keys(getCityObject()),
    datasets: [
      {
        label: "People Count ",
        data: Object.values(getCityObject()),
        backgroundColor: "rgba(25,118,210,0.5)",
      },
    ],
  };
  const ageData = {
    labels: Object.keys(getAgeObject()),
    datasets: [
      {
        label: "People Count ",
        data: Object.values(getAgeObject()),
        backgroundColor: "rgba(25,118,210,0.5)",
      },
    ],
  };
  const genderData = {
    labels: Object.keys(getGenderObject()),
    datasets: [
      {
        label: "People Count ",
        data: Object.values(getGenderObject()),
        backgroundColor: "rgba(25,118,210,0.5)",
      },
    ],
  };
  const occupationData = {
    labels: Object.keys(getOccupationObject()),
    datasets: [
      {
        label: "People Count ",
        data: Object.values(getOccupationObject()),
        backgroundColor: "rgba(25,118,210,0.5)",
      },
    ],
  };
  const stateData = {
    labels: Object.keys(getStateObject()),
    datasets: [
      {
        label: "People Count ",
        data: Object.values(getStateObject()),
        backgroundColor: "rgba(25,118,210,0.5)",
      },
    ],
  };
  const countryData = {
    labels: Object.keys(getCountryObject()),
    datasets: [
      {
        label: "People Count ",
        data: Object.values(getCountryObject()),
        backgroundColor: "rgba(25,118,210,0.5)",
      },
    ],
  };

  /////////////////////////////////
  const getSegmentPeopleCountObject = () => {
    let obj = {};
    // console.log(segments)
    segments.forEach((item) => {
      obj[item.name] = item.customer.length;
    });
    // console.log(obj);
    return obj;
  };

  useEffect(() => {
    getSegmentPeopleCountObject();
  }, segmentsChanged);
  const segmentsPeopleCountData = {
    labels: Object.keys(getSegmentPeopleCountObject()),
    datasets: [
      {
        label: "People Count ",
        data: Object.values(getSegmentPeopleCountObject()),
        backgroundColor: "rgba(25,118,210,0.5)",
      },
    ],
  };

  /////////////////////////
  const getSegmentCampaignCountObject = () => {
    let obj = {};
    // console.log(segments)
    campsArray.forEach((item) => {
      obj[item.segment] =
        obj[item.segment] === undefined ? 1 : obj[item.segment] + 1;
    });
    // console.log(obj);
    segments.forEach((item) => {
      if (obj[item.id] !== undefined) {
        obj[item.name] = obj[item.id];
        delete obj[item.id];
      }
    });
    return obj;
  };

  useEffect(() => {
    // console.log(campsArray)
  }, campsArrayChanged);

  const segmentsCampaignCountData = {
    labels: Object.keys(getSegmentCampaignCountObject()),
    datasets: [
      {
        label: "Campaings Hosted",
        data: Object.values(getSegmentCampaignCountObject()),
        backgroundColor: "rgba(25,118,210,0.5)",
      },
    ],
  };
  ////////////////////
  const getSalesObjectWithoutCampaign = () => {
    let obj1 = {};
    let obj2 = {};
    // console.log(segments)
    purchasedItem.forEach((item) => {
      if (item.campaign === null)
        obj1[item.product_name] =
          obj1[item.product_name] === undefined
            ? item.quantity
            : obj1[item.product_name] + item.quantity;
      else
        obj2[item.product_name] =
          obj2[item.product_name] === undefined
            ? item.quantity
            : obj2[item.product_name] + item.quantity;
    });

    return [obj1, obj2];
  };
  const salesWithoutCampaignData = {
    labels: Object.keys(getSalesObjectWithoutCampaign()[0]),
    datasets: [
      {
        label: "Sales without Campaign",
        data: Object.values(getSalesObjectWithoutCampaign()[0]),
        backgroundColor: "rgba(25,118,210,0.5)",
      },
      {
        label: "Sales with Campaign",
        data: Object.values(getSalesObjectWithoutCampaign()[1]),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  ///////////////////////////

  const getCartObjects = () => {
    let obj = {};
    // console.log(segments)
    cartItem.forEach((item) => {
      obj[item.product_name] =
        obj[item.product_name] === undefined
          ? item.quantity
          : obj[item.product_name] + item.quantity;
    });
    // console.log(obj);

    return obj;
  };

  const cartData = {
    labels: Object.keys(getCartObjects()),
    datasets: [
      {
        label: "Cart Item count",
        data: Object.values(getCartObjects()),
        backgroundColor: "rgba(25,118,210,0.5)",
      },
    ],
  };

  return (
    <div className="container_analytics">
      <Sidebar home={true} />
      <div className="cards_analytics">
        <h1 className="title">Know your customers</h1>
        <div className="analytics_graphs">
        <Grid
          container
          spacing={6}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          margin={10}
        >
          <Grid item xs={12} sm={6} md={5}>
          <Card sx={{ maxWidth: 800 }}>
            <p className="card-header"><b>Your Customers belong to :</b></p>
            <Bar options={options} data={cityData} />
          </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
          <Card sx={{ maxWidth: 800 }}>
          <p className="card-header"><b>Age-wise:</b></p>
            <Bar options={options} data={ageData} />
          </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
          <Card sx={{ maxWidth: 800 }}>
          <p className="card-header"><b>Gender Basis:</b></p>
            <Bar options={options} data={genderData} />
          </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
          <Card sx={{ maxWidth: 800 }}>
          <p className="card-header"><b>Occupation-wise:</b></p>
            <Bar options={options} data={occupationData} />
          </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
          <Card sx={{ maxWidth: 800 }}>
          <p className="card-header"><b>State-wise:</b></p>
            <Bar options={options} data={stateData} />
          </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={5}>
          <Card sx={{ maxWidth: 800 }}>
          <p className="card-header"><b>Country-wise:</b></p>
            <Bar options={options} data={countryData} />
          </Card>
          </Grid>
        </Grid>
        </div>
      </div>
      <div>
        <h1 className="title">Segment Area</h1>
        <Grid
          container
          spacing={4}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          margin={10}
        >
        <Grid item xs={12} sm={6} md={5}>
        <Card sx={{ maxWidth: 800 }}>
        <p className="card-header"><b>People inside segments</b></p>
          <Bar options={options} data={segmentsPeopleCountData} />
        </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
        <Card sx={{ maxWidth: 800 }}>
        <p className="card-header"><b>Campaigns inside segments</b></p>
          <Bar options={options} data={segmentsCampaignCountData} />
        </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
        <Card sx={{ maxWidth: 800 }}>
        <p className="card-header"><b>Sales</b></p>
          <Bar options={options} data={salesWithoutCampaignData} />
        </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
        <Card sx={{ maxWidth: 800 }}>
        <p className="card-header"><b>In-Cart Items</b></p>
          <Bar options={options} data={cartData} />
        </Card>
        </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Analytics;
