import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import "../css/TournamentStandings.css"
import { useLocation, useNavigate } from "react-router-dom";
import { LeaguesInterface } from "../../interface/LeagueInterface";
import Footer from "../../components/Footer";
import Standings from "../../components/Standings";
import axios from "axios";

export default function TournamentStandings ():JSX.Element{
    const location = useLocation(); 
    const navigate = useNavigate();
    
    const tournament: LeaguesInterface = location.state.tournament;
    const [tournamentData, setTournamentData] = useState([]);
    const [toggleSplit,setToggleSplit]= useState("Spring")
    const [dropDown,setDropdownToggle]= useState(false)
    const [year,setYear]= useState(2023)
    const models = ["Bayesian Model", "Linear Regression", "Random Forest"]
    
    
    useEffect(()=>{
        //populate the different standings here
        
        let apiLink = `http://127.0.0.1:5000/api/generate_tournament_data/${tournament.id}`
        try{
            axios.get(apiLink)
            .then(resp=>{
                console.log("RESP",resp.data)
            })
            .catch(error => {
                // Handle any errors here
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
  
    return(
        <div className="tournamentStandingContainer">
            <Navbar/>
            <div className="standingsMain">
                <div className="leftSide">
                    <div className="tournamentRegionCard">
                        <img  className="regionIcon"src={tournament.image}/>
                        <div>
                        <h3 className="tournamentTitle centerText">{tournament?.name}</h3>
                        <h3 className="regionTitle centerText">{formatRegion(tournament?.region)}</h3>
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
                                <Standings/>
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
                                        
                                        <Standings/>
                                    
                                </div>
                   </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}