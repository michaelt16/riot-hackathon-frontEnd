import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import "../css/TournamentStandings.css"
import { useFetcher, useLocation, useNavigate } from "react-router-dom";
import { LeaguesInterface } from "../../interface/LeagueInterface";
import Footer from "../../components/Footer";
import Standings from "../../components/Standings";
import axios from "axios";
import Load from "../../components/Load";
import ModelStandings from "../../components/ModelStandings";
interface Model{

    name:string,
    id:string
}

export default function TournamentStandings ():JSX.Element{
   
    const location = useLocation(); 
    const navigate = useNavigate();
    
    const league: LeaguesInterface = location.state.league;
    const tournamentData: LeaguesInterface = location.state.tournamentData
  
    const [standingsData,setStandingsData] = useState()
    const [dropDown,setDropdownToggle]= useState(false)
    const [tournamentIndex,setTournamentIndex] = useState<number>(0)
    const [modelStandingsData, setModelStandingsData] = useState()
    const [modelName,setModelName]= useState("Select a Model")
    const models:Model[] = [{name:"Bayesian Model",id:"bayesian"}, {name:"Logistic Regression",id:"logisticregression"}, {name:"Random Forest",id:"randomforest"}]
    const apiURL = "http://api.lolpowerrankings.click"
    
    const [stage,setStage]= useState("Regular Season")
    // const worlds2022Standings=["DRX","T1","JDG","GENG","ROUGUE","RNG","DWG KIA", "EDG"]
    // const worlds2021 =["EDG","DWG KIA","T1","GENG","HANWALIFE","RNG","RNG","MAD","C9"]
     const worlds2023TeamIds = [
        "100205573495116443",
        "98767991853197861",
        "99566404579461230",
        "100725845018863243",
        "99566404852189289",
        "99566404853854212",
        "99566404850008779",
        "99566404853058754",
        "98767991926151025",
        "98767991866488695",
        "103461966965149786",
        "106972778172351142",
        "98767991877340524",
        "98926509885559666",
        "107563714667537640",
        "104367068120825486",
        "107700199633958891",
        "98767991954244555",
        "108573042084687884",
        "100285330168091787",
        "105397404796640412",
        "98767991935149427"
      ];
      const msi2023TeamIds = [
        "99566404852189289",
        "99566404853854212",
        "98767991853197861",
        "100205573495116443",
        "98767991926151025",
        "98767991877340524",
        "103461966965149786",
        "99294153824386385",
        "104367068120825486",
        "98767991935149427",
        "105397404796640412",
        "98767991954244555",
        "100285330168091787"
      ];

    useEffect(()=>{
       
            
             const apiLink = `${apiURL}/tournamentStandings/${tournamentData.tournaments[0].id}`;
             axios.get(apiLink)
             .then((response) => {
                 const data = response.data;
                 console.log("Data",data[0])
                 const tournamentName = data[0].tournamentName
                //  if(tournamentName=== "worlds_2022"|| tournamentName=="msi_2022"|| tournamentName=="msi_2021"){
                //      console.log("working")
                //      setStage("knockouts")
                //  }else if (tournamentName==="worlds_2021"){
                //      setStage("Playoffs")
                //  }else{
                //      setStandingsData(data)
                     
                //  }
               
                 setStandingsData(data) 
                 
             })
             .catch((error) => {
                 console.error('Error fetching standings data:', error);
             });
          
          

       
    } ,[])
  
    useEffect(()=>{
        setModelName("Select a Model")
        setModelStandingsData(undefined)
    },[tournamentIndex])
    const handleClick = ()=>{
        navigate("/tournamentRanks")
    }

    const fetchStandingsData = (tournamentIndex:number) => {
        if (tournamentData && tournamentIndex >= 0 && tournamentIndex < tournamentData.tournaments.length) {

            const tournamentId = tournamentData.tournaments[tournamentIndex].id;
            const apiLink = `${apiURL}/tournamentStandings/${tournamentId}`;
            setStandingsData(undefined)
            axios.get(apiLink)
                .then((response) => {
                    const data = response.data;
                    const tournamentName = data[0].tournamentName
                     if(tournamentName=== "worlds_2022"|| tournamentName=="msi_2022"){
                    console.log("working")
                    setStage("knockouts")
                        }else if (tournamentName==="worlds_2021"){
                            setStage("Playoffs")
                        }else{
                            setStandingsData(data)
                        }
                  
                
                })
                .catch((error) => {
                    console.error('Error fetching standings data:', error);
                });
        } else {
            console.log("Tournament data is not loaded yet or the index is out of bounds.");
        }
    };
    
    const handleLeftArrowSplit = () => {
        setTournamentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
        fetchStandingsData(tournamentIndex - 1);
    };
    
    const handleRightArrowSplit = () => {
        setTournamentIndex((prevIndex) => (prevIndex < tournamentData?.tournaments.length - 1 ? prevIndex + 1 : prevIndex));
        fetchStandingsData(tournamentIndex + 1);
    };
 
   
    const dropDownClick = (e)=>{
     
        console.log("dropdownclicked")
        setDropdownToggle(!dropDown)
        
    }


    const formatRegion = (str:string)=>{
            return str !== "EMEA" ? str.toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : str; 
    }

    const handleFormatTournamentName = (index:number)=>{
        return tournamentData?.tournaments[index].name
    }

    const fetchModel= (model:Model)=>{
        setModelStandingsData(undefined)
        setModelName(model.name)
        if (tournamentData.tournaments[tournamentIndex].id != "") {
        const tournamentId = tournamentData.tournaments[tournamentIndex].id;
        const apiLink = `${apiURL}/model/tournamentsStandings/${tournamentId}`;

        const params = {
            model: model.id,
            stage: stage, 
          };
          axios.get(apiLink, { params })
            .then(response => {
             console.log("MODEL",response.data);
             setModelStandingsData(response.data)  
            })
            .catch(error => {
            console.error("Axios request error:", error);

            });
    }else{
            const apiLink = `${apiURL}/team_rankings`;
            console.log(worlds2023TeamIds)
            let teamIdsParam 
            console.log(tournamentData.tournaments[tournamentIndex].name)
            if(tournamentData.tournaments[tournamentIndex].name ==="MSI 2023"){
                teamIdsParam = `[${msi2023TeamIds.join(',')}]`;
            }else{
                teamIdsParam = `[${worlds2023TeamIds.join(',')}]`;
            }
            
            const params = {
                model:model.id,
                team_ids:teamIdsParam
            }
              axios.get(apiLink,{params})
                .then(response=>{
                    console.log("MODEL RESP",response.data);
                    setModelStandingsData(response.data)  
      }) 
    }

}

    return(
        <div className="tournamentStandingContainer">
            <Navbar/>
            <div className="standingsMain">
                <div className="leftSide">
                    <div className="tournamentRegionCard">
                        <img  className="regionIcon"src={league.image}/>
                        <div>
                        <h3 className="tournamentTitle centerText">{league?.name}</h3>
                        <h3 className="regionTitle centerText">{league?.region}</h3>
                        <div className="splitContainer centerText">
                                <h3 onClick={handleLeftArrowSplit} className="arrow">&lt;</h3>
                            
                                {tournamentData? (
                                     <h3>{handleFormatTournamentName(tournamentIndex)}</h3>
                                ):(
                                     <h3></h3>
                                )}
                                <h3 onClick={handleRightArrowSplit} className="arrow">&gt;</h3>
                        </div>
                        </div>
                    </div>

                    <div className="returnButtonContainer" onClick={handleClick}>
                        <h3>Return</h3>
                    </div>
                </div>
                <div className="standingsContainer">
                    <div className="leftSideWindow">
                        <div className="standingsHeader">
                                <div className="leftSideStandingsHeader">
                                <h1 className="textFont standingsText">Predicted Standings</h1>
                                </div>
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
                        
                            <div className="standingsWindow">
                                {
                                    modelStandingsData?(
                                        
                                           <ModelStandings data = {modelStandingsData}/>  
                                    ):(
                                        <Load/>
                                    )
                                }
                                   
                                      
               
                                    
                        </div>
                       
                   </div>
                   <div className="rightSideWindow">
                         <div className="standingsHeader">
                            <h1 className="textFont standingsText">Standings</h1>
                        </div>
                        <div className="standingsWindow">
                        {standingsData ? (
                            <Standings data= {standingsData[0].tournamentStandings}/>
                        ) : (
                            <Load/>
                        )}
                                
                        </div>
                   </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}