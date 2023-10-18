import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../css/TournamentRankings.css"
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { LeaguesInterface } from '../../interface/LeagueInterface';
import axios from "axios";
import Load from "../../components/Load";
  //will use context later.
export default function TournamentRankings(){
    const [leaguesArr, setLeaguesArr] = useState<LeaguesInterface[]>([]);
    
    const navigate = useNavigate()
    useEffect(() => {
        axios.get("http://matthewproject.click/leagues")
        .then(response=>{
            console.log(response.data)
            setLeaguesArr(response.data)
        })
    }, []);
    
    const handleClick = (league: LeaguesInterface)=>{
        
        navigate("/tournamentStandings",{ state: { league } })
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
                {leaguesArr.map((league) => {
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