import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../css/CustomRankings.css";
import Footer from "../../components/Footer";
import * as data from "../../esports_data/leagues.json";
import { LeaguesInterface } from '../../interface/LeagueInterface';
import Standings from "../../components/Standings";

//will use context later.
export default function CustomRankings() {
  const [teamOrderData, setTeamOrderData] = useState<LeaguesInterface[]>([]);

  useEffect(() => {
    const sortedData = data.default.sort(
      (a: LeaguesInterface, b: LeaguesInterface) => a.priority - b.priority
    );
    
    const teamOrderArr: LeaguesInterface[] = sortedData.filter((object: LeaguesInterface) => object.region !== "INTERNATIONAL")
      .map((team: LeaguesInterface) => ({
        ...team,
        isExpanded: false,
      }));

    setTeamOrderData(teamOrderArr);
  }, []);

  const handleFolderClick = (index: number) => {
    setTeamOrderData((prevTeamOrderData) => {
      const newTeamOrder = prevTeamOrderData.map((currTeam,i)=>({
          ...currTeam,
          isExpanded: i === index ? !currTeam.isExpanded : false
      }))
      return newTeamOrder
    });
  };

  return (
    <div className="customRankingsContainer">
      <Navbar />
      <div className="titleContainer">
        <h1 className="customTeamTitle">Custom Team Rankings</h1>
      </div>
      
      <div className="mainViewContainer">
      <div className="teamFolderWindowContainer">
        {teamOrderData.map((team, index) => {
          return (
            <div key={index}>
              <div className="teamFolderContainer" onClick={() => handleFolderClick(index)}>
                <img className="teamLogo" src={team?.image} />
                <h3 className="teamName">{team?.region}&nbsp;{team?.name}</h3>
              </div>
              {team.isExpanded && (
                <div className="expandedContent">
                 
                </div>
              )}
            </div>
          );
        })}
      </div>

        <div className="orderContainer">
            <div className="orderHeader">
              <div className="orderButton">
                  <h1>Rank Teams</h1>
              </div>
            </div>

            <div className="orderMainContainer">
              {/* populate the rank orders */}
              <Standings/>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
