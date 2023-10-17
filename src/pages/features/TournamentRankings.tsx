import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../css/TournamentRankings.css"
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { LeaguesInterface } from '../../interface/LeagueInterface';
import axios from "axios";
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

    return(
        <div className="tournamentRankPage">
             <Navbar/>
             <div className="headerTitleContainer">
                <h1>Choose a Tournament</h1>
             </div>

             <div className="regionContainer">
                {
                    leaguesArr.map((league)=>{
                        return(
                            <div className="regionCard" key={league.leagues_id} onClick={()=>handleClick(league)}>
                                <img className="regionCardIcons" src={league?.image} />
                                <div>
                                    <h3 className="tournamentName">{league?.region}&nbsp;{league?.name}</h3>
                                </div>
                               
                            </div>
                        )
                    })
                }

                <div>
             </div>
               
             </div>
             <Footer/>
        </div>
    )
}