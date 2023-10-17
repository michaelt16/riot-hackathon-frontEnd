import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../css/CustomRankings.css";
import Footer from "../../components/Footer";
import { LeaguesInterface } from '../../interface/LeagueInterface';
import Standings from "../../components/Standings";
import axios from "axios";


export default function CustomRankings() {
  const [leaguesArr, setLeaguesArr] = useState<LeaguesInterface[]>([]);
  // team array from the fetched data
  const [teamArr, setTeamArr] = useState([])
  // add into team arr
  const [orderTeamArr,setOrderTeamArr]=useState<object>([])
  useEffect(() => {
      axios.get("http://matthewproject.click/leagues")
      .then(response=>{
          const leaguesData = response.data
          const filterInternational: LeaguesInterface[] = leaguesData.filter((league:LeaguesInterface)=>league.region !== "INTERNATIONAL")
            .map((filteredLeague: LeaguesInterface)=>({
              ...filteredLeague,
              isExpanded: false
            }))
          setLeaguesArr(filterInternational)
      })
  }, []);


  const handleFolderClick = (index: number, league_id:number) => {
   
    setLeaguesArr((prevTeamOrderData) => {
      const newRegionData = prevTeamOrderData.map((currTeam,i)=>({ 
          ...currTeam,
          isExpanded: i === index ? !currTeam.isExpanded : false
      }))
      return newRegionData
    });

    handleFolderPopulation(league_id)
  };

  const handleFolderPopulation= (league_id:number)=>{
      //fetch thing
      //instead of this
     axios.get(`http://matthewproject.click/leagueTeams/${league_id}`)
     .then((response)=>{
        const data = response.data
        setTeamArr(data)
     })

     

  }

  const handleTeamClick=(e,team)=>{
    e.stopPropagation();
    console.log("SINGLE TEAM",team)
    const teamId = team.id;
    const teamExists = orderTeamArr.some(existingTeam => existingTeam.id === teamId);
  
    if (!teamExists) {
      // Team is not in the array, so add it
      const updatedArray = [...orderTeamArr, team];
      setOrderTeamArr(updatedArray);
    }
    
  }
  console.log(orderTeamArr)
  return (
    <div className="customRankingsContainer">
      <Navbar />
      <div className="titleContainer">
        <h1 className="customTeamTitle">Custom Team Rankings</h1>
      </div>
      
      <div className="mainViewContainer">
      <div className="teamFolderWindowContainer">
        {leaguesArr.map((league, index) => {
          // going to fetch depending on id instead
         
          return (
            <div key={index+1} className="folder">
              <div className="leaguesFolderContainer" onClick={(e) => handleFolderClick(index,league.leagues_id)}>
                <img className="leagueLogo" src={league?.image} />
                <h3 className="teamName">{league?.region}&nbsp;{league?.name}</h3>
              </div>
              {league.isExpanded && (
                <div className="expandedContent">
                  {
                    teamArr?.map((team)=>{
                      return(
                        <div className="folderTeamName" key={team?.id} onClick={(e)=>handleTeamClick(e,team)}>
                          {team?.team_info.name}
                        </div>
                      )
                    })
                  }
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
              {/* its gonna be in a form of an array and everytime i click it adds into the prop array */}
              <Standings data={orderTeamArr}/>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
