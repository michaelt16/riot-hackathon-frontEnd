import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../css/TournamentRankings.css"
import Footer from "../../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { LeaguesInterface } from '../../interface/LeagueInterface';
import axios from "axios";
import Load from "../../components/Load";
import { useLeagues } from "../../context/LeaguesProvider";
  
export default function TournamentRankings(){
    const location = useLocation(); 
    // const [leaguesArr, setLeaguesArr] = useState<LeaguesInterface[]>([]);
    const leaguesArr = useLeagues();
    const [tournamentData, setTournamentData] = useState();
    const navigate = useNavigate()
    interface League {
  leagues_id: number;
  image: string;
  region: string;
  name: string;
  // Add any other properties present in the 'league' objects
}
    
    const handleClick = async (league: LeaguesInterface)=>{
        try {
            const tournamentResponse = await axios.get(`http://api.lolpowerrankings.click/leagueTournaments/${league.leagues_id}`);
            console.log("tourData", tournamentResponse.data);
            const tournamentData = tournamentResponse.data
            navigate("/tournamentStandings",{ state: { league:league,tournamentData: tournamentData } })
            
            setTournamentData(tournamentResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleReturn=()=>{
        navigate("/home")
    }

    return(
        <div className="tournamentRankPage">
             <Navbar/>
             <div className="header">
                <div className="returnToMain">
                    <div className="returnButton" onClick={handleReturn}>Return</div>
                </div>
             <div className="headerTitleContainer">
                
                <h1>Choose a Tournament</h1>
             </div>
            </div>
             <div className="regionContainer">
               
            
             {leaguesArr.length === 0 ? (

                <div className="centerLoader">
                    <Load />
                    <div className="space"></div>
                </div>
            ) : (
                // Display the region cards when leaguesArr is not empty
                <div className="regionContainer">
                {leaguesArr.map((league: LeaguesInterface) => {
                    return (
                    <div className="regionCard" key={league.leagues_id} onClick={() => handleClick(league)}>
                        <img className="regionCardIcons" src={league?.image} />
                        <div>
                        <h3 className="tournamentName">
                            {league?.region}&nbsp;{league?.name}
                        </h3>
                        </div>
                    </div>
                    );
                })}
                </div>
  )}

                <div>
             </div>
               
             </div>
             <Footer/>
        </div>
    )
}