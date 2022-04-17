import * as React from "react";
import "./Sidebar.css";
import Analytics from "../Analytics/Analytics";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import BarChartIcon from "@mui/icons-material/BarChart";
import HomeIcon from "@mui/icons-material/Home";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import CommentIcon from "@mui/icons-material/Comment";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

//#055cd2 (logo color)

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft(props) {
  const [user, setUser] = React.useState("");

  // const url = "http://127.0.0.1:8000/api/"
  const url = "https://tmt-be-urtjok3rza-wl.a.run.app/api/"
  const getUser = async () => {
    const response = await fetch(url+"user", {
      method: "GET",
      credentials: "include",
    });
    // console.log(JSON.stringify({
    //   email,
    //   password
    // }));
    const content = await response.json();
    setUser(content.username);

    console.log("Hi " + content.username);
  };

  React.useEffect(() => {
    getUser();
  }, []);

  let navigate = useNavigate();
  const logout = async () => {
    const response = await fetch(url+"logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/login");
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const routeChange = (index) => {
    let path = [`/analytics`, `/segments/view`, `/campaign/view`];
    navigate(path[index]);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon sx={{ mr: 2, ...(!props.home && { display: "none" }) }} />
          </IconButton>
          <div className="header-container">
            <img
              src={require("../../assets/logos.png")}
              width="180"
              className="logo"
            />

            <Typography
              variant="h6"
              component="div"
              align="right"
              className="username"
              display={"flex"}
              alignItems={"center"}
            >
              Hi {user}
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              align="right"
              className="logout"
              display={"flex"}
              alignItems={"center"}
              onClick={logout}
            >
              <LogoutIcon />
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open && props.home}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Home"].map((text, index) => (
            <ListItem button key={text} onClick={() => navigate(`/home`)}>
              <ListItemIcon>
                {index % 2 === 0 ? <HomeIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Analytics", "Segments", "Campaigns"].map((text, index) => (
            <ListItem button key={text} onClick={() => routeChange(index)}>
              <ListItemIcon>
                {index === 0 ? (
                  <BarChartIcon />
                ) : index === 1 ? (
                  <PeopleOutlineIcon />
                ) : (
                  <CommentIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        {/* <Divider />
        <List>
          {['Login'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <LoginIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>

      <Main className="Container" open={open}>
        <DrawerHeader />

        {/* <BrowserRouter>
      <div className="App">
        <div className="App-center">
          <Routes>
      
            <Route path="/analytics" element={<Analytics />}></Route>

              {/* <Route index element={<Home />} /> }
               <Route path="teams" element={<Teams />}>
                <Route path=":teamId" element={<Team />} />
                <Route path="new" element={<NewTeamForm />} />
                <Route index element={<LeagueStandings />} />
              </Route>
           
          { </Routes> }
        </div>
      </div>
    </BrowserRouter> */}

        {/* <div className='Container'> Tmarketing</div> */}
      </Main>
    </Box>
  );
}
