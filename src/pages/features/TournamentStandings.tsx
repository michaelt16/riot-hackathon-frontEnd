import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import "../css/TournamentStandings.css"
import { useLocation, useNavigate } from "react-router-dom";
import { LeaguesInterface } from "../../interface/LeagueInterface";
import Footer from "../../components/Footer";
import Standings from "../../components/Standings";
import axios from "axios";
import Load from "../../components/Load";

export default function TournamentStandings ():JSX.Element{
    const location = useLocation(); 
    const navigate = useNavigate();
    
    const league: LeaguesInterface = location.state.league;
    const [tournamentData, setTournamentData] = useState();
    const [standingsData,setStandingsData] = useState()
    const [dropDown,setDropdownToggle]= useState(false)
    const [tournamentIndex,setTournamentIndex] = useState<number>(0)
    const [fetchState, setFetchState] = useState(false)
    const models = ["Bayesian Model", "Linear Regression", "Random Forest"]
    
  
    // i gotta fetch the leagueTournaments

    useEffect(()=>{
        let apiLink = `http://matthewproject.click/leagueTournaments/${league.leagues_id}`

        try{
            axios.get(apiLink)
            .then(response=>{
                setTournamentData(response.data)
            })
        }catch(error){
            console.error('Error fetching data:', error);
        }
    },[])
    // console.log("tournamentDataFrom leagueTournaments endpoint:", tournamentData?.tournaments)
    // console.log("TTT",tournamentData?.tournaments[0].id)
    
    useEffect(()=>{
       
        console.log("asersdfsdf", tournamentData, fetchState)
        if(tournamentData!= undefined){
                const tournamentId = tournamentData?.tournaments[tournamentIndex].id
                console.log("Test",tournamentId)

                let apiLink = `http://matthewproject.click/tournamentStandings/${tournamentId}`
                try{
                    axios.get(apiLink)
                    .then(response=>{
                       
                        setStandingsData(response.data)
                       
                        
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                      });
                }
                catch(e){
                    console.log(e)
                }
            }
    },[tournamentIndex])
           
   
      
        
   
    const handleClick = ()=>{
        navigate("/tournamentRanks")
    }
    // const handleLeftArrowYear = ()=>{
    //     setTournamentIndex(tournamentIndex-1)
    // }
    // const handleRightArrowYear = ()=>{
    //     setTournamentIndex(tournamentIndex-1)
    // }
    // const fetchTournamentStandings = () =>{
    //     console.log("Testststestsetst")
    //     let apiLink = `http://matthewproject.click/tournamentStandings/${tournamentData?.tournaments[tournamentIndex].id}`
    //     try{
    //         axios.get(apiLink)
    //         .then(response=>{
            
    //             setStandingsData(response.data)
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //           });
    //     }
    //     catch(e){
    //         console.log(e)
    //     }
    // }
    const handleLeftArrowSplit = () =>{
        setStandingsData(undefined)
        setTournamentIndex(tournamentIndex!= 0 ? tournamentIndex-1: tournamentIndex)
        
    }
    const handleRightArrowSplit = () =>{
        setStandingsData(undefined)
        setTournamentIndex(tournamentIndex!= tournamentData?.length-1 ? tournamentIndex+1: tournamentIndex)
        
    }
    
 
   
    const dropDownClick = ()=>{
        setDropdownToggle(!dropDown)
    }


    const formatRegion = (str:string)=>{
            return str !== "EMEA" ? str.toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : str; 
    }

    const handleFormatTournamentName = (index)=>{
        return tournamentData?.tournaments[index].name
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
                        <h3 className="regionTitle centerText">{formatRegion(league?.region)}</h3>
                        <div className="splitContainer centerText">
                                <h3 onClick={handleLeftArrowSplit} className="arrow">&lt;</h3>
                            
                                {tournamentData? (
                                     <h3>{handleFormatTournamentName(tournamentIndex)}</h3>
                                ):(
                                     <h3>{}</h3>
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
                   <div className="rightSideWindow">
                        <div className="standingsHeader">
                            <div className="leftSideStandingsHeader">
                             <h1 className="textFont standingsText">Predicted Standings</h1>
                            </div>
                            <div className="dropdownContainer">
                             
                                <div className="dropdown">Model: Select a Model</div>
                             
                            </div>
                        
                        </div>
                       
                        <div className="standingsWindow">
                                <Load/>
                                        {/* <Standings/>  */}
               
                                    
                        </div>
                   </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}