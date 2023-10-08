import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../css/TournamentRankings.css"
import * as data from "../../esports_data/leagues.json";
import Footer from "../../components/Footer";
interface LeaguesInterface {
    region: string;
    name: string;
    priority: number;
    image: string;
    id: number;
    isExpanded: boolean;
  }
  //will use context later.
export default function TournamentRankings(){
    const [teamOrderData, setTeamOrderData] = useState<LeaguesInterface[]>([]);

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

    return(
        <div className="tournamentRankPage">
             <Navbar/>
             <div className="headerTitleContainer">
                <h1>Choose a Tournament</h1>
             </div>

             <div className="regionContainer">
                {
                    teamOrderData.map((team,index)=>{
                        return(
                            <div className="regionCard" key={index}>
                                <img className="regionCardIcons" src={team?.image} />
                                <div>
                                    <h3 className="tournamentName">{team?.region}&nbsp;{team?.name}</h3>
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