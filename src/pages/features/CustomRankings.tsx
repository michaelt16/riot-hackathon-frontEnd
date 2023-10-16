import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../css/CustomRankings.css";
import Footer from "../../components/Footer";
import * as data from "../../esports_data/leagues.json";
import { LeaguesInterface } from '../../interface/LeagueInterface';
import Standings from "../../components/Standings";
import * as tournamentData from "../../esports_data/tournamets.json";

//will use context later.
export default function CustomRankings() {
  const [regionOrderData, setRegionOrderData] = useState<LeaguesInterface[]>([]);

  const [mockDataLCS, setMockDataLCS] = useState({
    id: 98767991299243165,
    teams: [{ name: "C9"},
            { name: "GG"},
            { name: "EG"},
            { name: "TL"},
            { name: "NRG"},
            { name: "TSM"},
            { name: "DIG"},
            { name: "100"},
            { name: "FLY"},
            { name: "IMT"}
          ]
  });

  const [mockDataLEC, setMockDataLEC] = useState({
    id: 98767991302996019,
    teams: [{ name: "G2"},
            { name: "FNC"},
            { name: "EX"},
            { name: "TH"},
            { name: "BDS"},
            { name: "SK"},
            { name: "MAD"},
            { name: "KOI"},
            { name: "AST"},
            { name: "VIT"}
          ]
  });

  const [regionFodlerData, setRegionFolderData] = useState()

//   useEffect(()=>{
//     tournamentData.default.filter((data) => data.id === "110303581083678395")
//       .map((tournament)=>{
//         console.log(tournament)
//       })
// },[])

  useEffect(() => {
    const sortedData = data.default.sort(
      (a: LeaguesInterface, b: LeaguesInterface) => a.priority - b.priority
    );
    
    const teamOrderArr : LeaguesInterface[] = sortedData.filter((object: LeaguesInterface) => object.region !== "INTERNATIONAL")
      .map((team: LeaguesInterface) => ({
        ...team,
        isExpanded: false,
      }));

    setRegionOrderData(teamOrderArr);
  }, []);

  const handleFolderClick = (index: number, id:string) => {
    setRegionOrderData((prevTeamOrderData) => {
      const newRegionData = prevTeamOrderData.map((currTeam,i)=>({ 
          ...currTeam,
          isExpanded: i === index ? !currTeam.isExpanded : false
      }))
      return newRegionData
    });

    handleFolderPopulation(id)
  };

  const handleFolderPopulation= (id:string)=>{
      //fetch thing
      //instead of this
     

      if(mockDataLCS.id ===parseInt(id)){
        console.log("TEST",mockDataLCS)
        mockDataLCS.teams.map((team)=>{
          console.log(team.name)
        })
        
      } 
      if(mockDataLEC.id ===parseInt(id)){
        console.log("TEST",mockDataLEC)
        mockDataLEC.teams.map((team)=>{
          console.log(team.name)
        })}

  }
  console.log(regionOrderData)
  return (
    <div className="customRankingsContainer">
      <Navbar />
      <div className="titleContainer">
        <h1 className="customTeamTitle">Custom Team Rankings</h1>
      </div>
      
      <div className="mainViewContainer">
      <div className="teamFolderWindowContainer">
        {regionOrderData.map((team, index) => {
          // going to fetch depending on id instead
         
          return (
            <div key={index+1} className="folder"onClick={() => handleFolderClick(index,team.id)}>
              <div className="teamFolderContainer" >
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
