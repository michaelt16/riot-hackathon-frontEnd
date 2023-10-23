import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "../css/CustomRankings.css";
import Footer from "../../components/Footer";
import { LeaguesInterface } from '../../interface/LeagueInterface';
import Standings from "../../components/Standings";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLeagues } from "../../context/LeaguesProvider";
interface Model{

  name:string,
  id:string
}

export default function CustomRankings() {
  const navigate = useNavigate()
  const [leaguesArr, setLeaguesArr] = useState<LeaguesInterface[]>([]);
  const [dropDown,setDropdownToggle]= useState(false)
  const [modelStandingsData, setModelStandingsData] = useState()
  // team array from the fetched data
  const [teamArr, setTeamArr] = useState([])
  const [modelName,setModelName]= useState("Select a Model")
    const models:Model[] = [{name:"Bayesian Model",id:"bayesian"}, {name:"Logistic Regression",id:"logisticregression"}, {name:"Random Forest",id:"randomforest"}]
  // add into team arr
  const [orderTeamArr,setOrderTeamArr]=useState<object>([])
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
    //fetch from the model endpoint and store into orderTeamArr and it will update the standings prop
    console.log("rerank")
    const clonedArr = [...orderTeamArr];

    for (let i = clonedArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [clonedArr[i], clonedArr[j]] = [clonedArr[j], clonedArr[i]];
    }
    setOrderTeamArr(clonedArr)
  
  }
  const handleReturn=()=>{
    navigate("/home")
}
const fetchModel= (model:Model)=>{
  const apiURL = "http://api.lolpowerrankings.click"
  const apiLink = `${apiURL}/model/tournamentsStandings/`;
  setModelName(model.name)
  const params = {
      model: model.id,
      stage: "test", 
    };
    axios.get(apiLink, { params })
      .then(response => {
       console.log(response.data);
       setModelStandingsData(response.data)  
      })
      .catch(error => {
      console.error("Axios request error:", error);

});
  
}
 
   
const dropDownClick = (e)=>{
     
  console.log("dropdownclicked")
  setDropdownToggle(!dropDown)
  
}


  console.log(orderTeamArr)
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
                                                    <div className="dropDownExpandedBox" onClick={()=>fetchModel(model)}>
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
              {/* populate the rank orders */}
              {/* its gonna be in a form of an array and everytime i click it adds into the prop array */}
              {/* if null load the loader */}
              <Standings data={orderTeamArr}/>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
