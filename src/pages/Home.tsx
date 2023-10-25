import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import "../pages/css/Home.css"
import leaguesLogo from "../assets/leaguesLogo.png"
import worldLogo from "../assets/worldsLogo.png"
import takeoverLogo from "../assets/takeoverLogo.png"

import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import axios from "axios"
import { LeaguesInterface } from "../interface/LeagueInterface"
import { useLeagues } from "../context/LeaguesProvider"

export default function Home(): JSX.Element {
  
    const navigate = useNavigate()

    const tournamentRankingsClick=()=>{
      navigate("/tournamentRanks")
    }
    const globalRankingsClick=()=>{
      navigate("/globalRanks")
    }
    const customRankingsClick=()=>{
      navigate("/customRanks")
    }
    return(
      <div className="homeContainer">
            <Navbar/>
            
             <div className="titleContainer">
                <h1 className="titleText">Select a Feature</h1>
             </div>
             <div className="featureContainer">
                <div className="selection" onClick={tournamentRankingsClick}>
                   <img className="leaguesImage" src = {leaguesLogo}/>
                   <h3 className="featureText">Tournament Rankings</h3>
                </div>
                <div className="selection" onClick={globalRankingsClick}>
                   <img className="worldsImage" src = {worldLogo}/>
                   <h3 className="featureText">Global Rankings</h3>
                </div>
                <div className="selection" onClick={customRankingsClick}>
                  <img className="takeoverImage" src = {takeoverLogo}/> 
                  <h3 className="featureText">Custom Rankings</h3>
                </div>
                
             </div>
             <Footer/>
             
        </div>
        
    )

}