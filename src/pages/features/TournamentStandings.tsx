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
    const [tournamentData, setTournamentData] = useState(league.tournaments);
    const [standingsData,setStandingsData] = useState()
    const [toggleSplit,setToggleSplit]= useState("Spring")
    const [dropDown,setDropdownToggle]= useState(false)
    const [year,setYear]= useState(2023)
    const models = ["Bayesian Model", "Linear Regression", "Random Forest"]
    
    console.log(tournamentData[0]?.id)
    useEffect(()=>{
        //populate the different standings here
        // tournament data is bugged, get rid of all the tournament data that dont map to anything
        let apiLink = `http://matthewproject.click/tournamentStandings/${tournamentData[1]?.id}`
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
    },[year])
    const handleClick = ()=>{
        navigate("/tournamentRanks")
    }
    const handleLeftArrowYear = ()=>{
        setYear(year > 2019 ? year - 1 : year);
    }
    const handleRightArrowYear = ()=>{
        setYear(year < 2023 ? year + 1 : year);
    }
    
    const handleLeftArrowSplit = () =>{
        setToggleSplit("Spring")
    }
    const handleRightArrowSplit = () =>{
        setToggleSplit("Summer")
    }
    const dropDownClick = ()=>{
        setDropdownToggle(!dropDown)
    }


    const formatRegion = (str:string)=>{
            return str !== "EMEA" ? str.toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : str; 
    }
    // console.log("check",standingsData[0]?.tournamentStandings)
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
                                <h3>{toggleSplit}</h3>
                                <h3 onClick={handleRightArrowSplit} className="arrow">&gt;</h3>
                        </div>

                        <div className="yearContainer centerText">
                                <h3 onClick={handleLeftArrowYear} className="arrow">&lt;</h3>
                                <h3>{year}</h3>
                                <h3 onClick={handleRightArrowYear} className="arrow">&gt;</h3>
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
                            <Standings data={standingsData[0]?.tournamentStandings} />
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