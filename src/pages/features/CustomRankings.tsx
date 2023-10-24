import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../css/CustomRankings.css";
import Footer from "../../components/Footer";
import { LeaguesInterface } from '../../interface/LeagueInterface';
import Standings from "../../components/Standings";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLeagues } from "../../context/LeaguesProvider";
import Load from "../../components/Load";
import ModelStandings from "../../components/ModelStandings";
interface Model{

  name:string,
  id:string
}

export default function CustomRankings() {
  const navigate = useNavigate()
  const [leaguesArr, setLeaguesArr] = useState<LeaguesInterface[]>([]);
  const [dropDown,setDropdownToggle]= useState(false)
  const [modelStandingsData, setModelStandingsData] = useState()
  const [modelData,setModelData]=useState<Model>()
  // team array from the fetched data
  const [teamArr, setTeamArr] = useState([])
  const [modelName,setModelName]= useState("Select a Model")
    const models:Model[] = [{name:"Bayesian Model",id:"bayesian"}, {name:"Logistic Regression",id:"logisticregression"}, {name:"Random Forest",id:"randomforest"}]
  // add into team arr
  const [orderTeamArr,setOrderTeamArr]=useState<object>([])
  const apiURL = "http://api.lolpowerrankings.click"
  const leagues = useLeagues();
  useEffect(() => {
      
          const filterInternational: LeaguesInterface[] = leagues.filter((league:LeaguesInterface)=>league.region !== "INTERNATIONAL")
            .map((filteredLeague: LeaguesInterface)=>({
              ...filteredLeague,
              isExpanded: false
            }))
          setLeaguesArr(filterInternational)
     
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
  
     axios.get(`http://api.lolpowerrankings.click/leagueTeams/${league_id}`)
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

  const handleRankTeamsButton=()=>{
    
    const apiLink = `${apiURL}/team_rankings`;
    const idArray = orderTeamArr.map(item => item.id);
    console.log(idArray)
    if(modelData!= undefined){
      const teamIdsParam = `[${idArray.join(',')}]`;
      const params = {
        model:modelData.id,
        team_ids:teamIdsParam
      }
      console.log(params)
      axios.get(apiLink,{params})
      .then(response=>{
        console.log("MODEL RESP",response.data);
        setModelStandingsData(response.data)  
      })
      
    }else{
      console.log("pick a model first")
    }
    
    
  
  }
  const handleReturn=()=>{
    navigate("/home")
}
const toggleModel= (model:Model)=>{
  setModelName(model.name)
  setModelData(model)
}
 
   
const dropDownClick = (e)=>{
     
  console.log("dropdownclicked")
  setDropdownToggle(!dropDown)
  
}


  // console.log(orderTeamArr)
  return (
    <div className="customRankingsContainer">
      <Navbar />
      <div className="header">
           <div className="returnToMain">
                    <div className="returnButton" onClick={handleReturn}>Return</div>
                </div>
        <div className="headerTitleContainer">
          <h1 className="customTeamTitle">Custom Team Rankings</h1>
        </div>
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
              <div className="orderButton" onClick={handleRankTeamsButton}>
                  <h1>Rank Teams</h1>
              </div>
              <div className="dropDownLocation">
              <div className="dropdownContainer"  onClick={(e)=> dropDownClick(e)}>
                                
                                <div className="dropdownBox"> Model: {modelName}</div>
                                {
                                    dropDown?(
                                        <div className="dropdownExpandedContainer">

                                            {models.map((model)=>{
                                                return(
                                                    <div className="dropDownExpandedBox" onClick={()=>toggleModel(model)}>
                                                        {model.name}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ):
                                    (
                                        <div></div>
                                    )
                                }
                            
                            </div>
                            </div>
            </div>

            <div className="orderMainContainer">
            {modelStandingsData ? (
                <ModelStandings data={modelStandingsData} />
              ) : orderTeamArr.length !== 0 ? (
                <Standings data={orderTeamArr} />
              ) : (
                <Load />
              )}

              
            
              
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
