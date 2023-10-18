import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../css/GlobalRankings.css"
import { useNavigate } from "react-router-dom";
export default function GlobalRankings(){
    const navigate = useNavigate()
    const handleReturn = ()=>{
        navigate("/home")
    }
    return(
        <div className="globalRankingsPage">
             <Navbar/>
             <div className="header">
                <div className="returnToMain">
                    <div className="returnButton" onClick={handleReturn}>Return</div>
                </div>
             <div className="headerTitleContainer">
                
                <h1>Global Rankings</h1>
             </div>
            </div>
        </div>
    )
}