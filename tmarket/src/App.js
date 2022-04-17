import "./App.css";
import LoginPage from "./Components/LoginPage/LoginPage";
import Signup from "./Components/SignupPage/Signup";
// import Sidebar from "./Components/Sidebar/Sidebar";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Analytics from "./Components/Analytics/Analytics";
import Home from "./Components/Home/Home";
import Segments from "./Components/Segments/Segments";
import Campaign from "./Components/Campaigns/Campaign";
import CampaignHome from "./Components/Campaigns/CampaignHome";
import ViewCampaigns from "./Components/Campaigns/ViewCampaigns";
import SegmentsHome from "./Components/Segments/SegmentsHome";
import ViewSegments from "./Components/Segments/ViewSegments"
import LandingPage from "./Components/LandingPage/LandingPage";


function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/analytics" element={<Analytics />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/segments" element={<SegmentsHome />}></Route>
            <Route path="/segments/create" element={<Segments />}></Route>
            <Route path="/segments/view" element={<ViewSegments />}></Route>


            <Route path="/campaign" element={< CampaignHome />}></Route>
            <Route path="/campaign/create" element={<Campaign />}></Route>
            <Route path="/campaign/view" element={<ViewCampaigns />}></Route>
            

              {/* <Route index element={<Home />} /> }
               <Route path="teams" element={<Teams />}>
                <Route path=":teamId" element={<Team />} />
                <Route path="new" element={<NewTeamForm />} />
                <Route index element={<LeagueStandings />} />
              </Route> */}
           
          </Routes>
    </BrowserRouter>
  );
}

export default App;
