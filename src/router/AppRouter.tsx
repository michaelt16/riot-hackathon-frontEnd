import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TitlePage from "../pages/LandingPage";
import Home from "../pages/Home"
import CustomRankings from "../pages/features/CustomRankings";
import GlobalRankings from "../pages/features/GlobalRankings";
import TournamentRankings from "../pages/features/TournamentRankings";
import TournamentsStandings from "../pages/features/TournamentStandings";
import HealthCheck from "../HealthCheck";
import { LeaguesInterface } from "../interface/LeagueInterface";
import axios from "axios";
import { LeaguesProvider } from "../context/LeaguesProvider";
export default function AppRouter(){
    const [leaguesArr, setLeaguesArr] = useState<LeaguesInterface[]>([]);
    useEffect(() => {
      try{
          axios.get("http://matthewproject.click/leagues")
          .then(response=>{
              console.log(response.data)
              setLeaguesArr(response.data)
          })
      }
      catch(e){
          console.log("leaguesErr:",e)
      }
     
  }, []);

    return(
        <LeaguesProvider>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<TitlePage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/tournamentRanks" element={<TournamentRankings />} />
                <Route path="/tournamentStandings" element={<TournamentsStandings />} />
                <Route path="/globalRanks" element={<GlobalRankings />} />
                <Route path="/customRanks" element={<CustomRankings />} />
                <Route path ="/healthCheck" element={<HealthCheck/>}/>
            </Routes>
        </BrowserRouter>
      </LeaguesProvider>
    )
}