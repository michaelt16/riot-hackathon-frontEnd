import React, { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import "../css/TournamentStandings.css"
import { useLocation, useNavigate } from "react-router-dom";
import { LeaguesInterface } from "../../interface/LeagueInterface";
import Footer from "../../components/Footer";
import Standings from "../../components/Standings";

export default function TournamentStandings ():JSX.Element{
    const location = useLocation(); 
    const navigate = useNavigate();
    
    const tournament: LeaguesInterface = location.state.tournament;
    const [year,setYear]= useState(2023)

    
    
    useEffect(()=>{
        //populate the different standings here
    },[year])
    const handleClick = ()=>{
        navigate("/tournamentRanks")
    }
    const handleLeftArrowClick = ()=>{
        setYear(year > 2010 ? year - 1 : year);
    }
    const handleRightArrowClick = ()=>{
        setYear(year < 2023 ? year + 1 : year);
    }
    
  


    const formatRegion = (str:string)=>{
       
            return str !== "EMEA" ? str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : str; 
        
        
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
                        <div className="yearContainer centerText">
                                <h3 onClick={handleLeftArrowClick} className="arrow">&lt;</h3>
                                <h3>{year}</h3>
                                <h3 onClick={handleRightArrowClick} className="arrow">&gt;</h3>
                        </div>
                        </div>
                    </div>

                    <div className="returnButtonContainer" onClick={handleClick}>
                        <h3>Return</h3>
                    </div>
                </div>
                <div className="rightSide">
                   <div className="rightSideHeader">
                       <h1 className="textFont standingsText">Standings</h1>
                   </div>
                   <div className="standingsWindow">
                        <Standings/>

                   </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}