import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../css/TournamentRankings.css"
import * as data from "../../esports_data/leagues.json";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { LeaguesInterface } from '../../interface/LeagueInterface';
  //will use context later.
export default function TournamentRankings(){
    const [teamOrderData, setTeamOrderData] = useState<LeaguesInterface[]>([]);
    const navigate = useNavigate()
    useEffect(() => {
      const sortedData = data.default.sort(
        (a: LeaguesInterface, b: LeaguesInterface) => a.priority - b.priority
      );
      
      const teamOrderArr: LeaguesInterface[] = sortedData.map((team: LeaguesInterface) => ({
          ...team,
          isExpanded: false,
        }));
      console.log(teamOrderArr)
      setTeamOrderData(teamOrderArr);
    }, []);

    const handleClick = (tournament: LeaguesInterface)=>{
        navigate("/tournamentStandings",{ state: { tournament } })
    }

    return(
        <div className="tournamentRankPage">
             <Navbar/>
             <div className="headerTitleContainer">
                <h1>Choose a Tournament</h1>
             </div>

             <div className="regionContainer">
                {
                    teamOrderData.map((tournament,index)=>{
                        return(
                            <div className="regionCard" key={index} onClick={()=>handleClick(tournament)}>
                                <img className="regionCardIcons" src={tournament?.image} />
                                <div>
                                    <h3 className="tournamentName">{tournament?.region}&nbsp;{tournament?.name}</h3>
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