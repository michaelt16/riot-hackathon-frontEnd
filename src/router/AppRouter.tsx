import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TitlePage from "../pages/LandingPage";
import Home from "../pages/Home"
import CustomRankings from "../pages/features/CustomRankings";
import GlobalRankings from "../pages/features/GlobalRankings";
import TournamentRankings from "../pages/features/TournamentRankings";
import TournamentsStandings from "../pages/features/TournamentStandings";
export default function AppRouter(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<TitlePage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/tournamentRanks" element={<TournamentRankings />} />
            <Route path="/tournamentStandings" element={<TournamentsStandings />} />
            <Route path="/globalRanks" element={<GlobalRankings />} />
            <Route path="/customRanks" element={<CustomRankings />} />
        </Routes>
      </BrowserRouter>
    )
}