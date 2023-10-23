import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import "../css/TournamentStandings.css"
import { useFetcher, useLocation, useNavigate } from "react-router-dom";
import { LeaguesInterface } from "../../interface/LeagueInterface";
import Footer from "../../components/Footer";
import Standings from "../../components/Standings";
import axios from "axios";
import Load from "../../components/Load";
interface Model{

    name:string,
    id:string
}

interface Tournament{

}
export default function TournamentStandings ():JSX.Element{
   
    const location = useLocation(); 
    const navigate = useNavigate();
    
    const league: LeaguesInterface = location.state.league;
    const tournamentData: LeaguesInterface = location.state.tournamentData
    // const [tournamentData, setTournamentData] = useState();
    const [standingsData,setStandingsData] = useState()
    const [dropDown,setDropdownToggle]= useState(false)
    const [tournamentIndex,setTournamentIndex] = useState<number>(0)
    const [modelStandingsData, setModelStandingsData] = useState()
    const [modelName,setModelName]= useState("Select a Model")
    const models:Model[] = [{name:"Bayesian Model",id:"bayesian"}, {name:"Logistic Regression",id:"logisticregression"}, {name:"Random Forest",id:"randomforest"}]
    const apiURL = "http://api.lolpowerrankings.click"
    useEffect(()=>{
        const apiLink = `${apiURL}/tournamentStandings/${tournamentData.tournaments[0].id}`;
    
        axios.get(apiLink)
            .then((response) => {
                const data = response.data;
                console.log(data)
                setStandingsData(data);
            
            })
            .catch((error) => {
                console.error('Error fetching standings data:', error);
            });
    } ,[])
  
    useEffect(()=>{
        setModelName("Select a Model")
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
                    setStandingsData(data);
                
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
        const tournamentId = tournamentData.tournaments[tournamentIndex].id;
        const apiLink = `${apiURL}/model/tournamentsStandings/${tournamentId}`;
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
                                    <Load/>
                                        {/* <Standings/>  */}
               
                                    
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