import React from "react";
import Navbar from "../components/Navbar";
import video from "../assets/lolesports_trailer.mp4"
import worldsVideo from "../assets/worlds2023.mp4"
import "./css/LandingPage.css"
import { Link, useNavigate } from "react-router-dom";
export default function TitlePage(): JSX.Element {
    const navigate = useNavigate();
    const handleClick = ()=>{
        try{
            console.log("running")
            navigate("/home")
        }catch(e){
            console.log("not running")
        }
        
    }
    return(
        <div className="titlePageContainer">
            <Navbar/>
           
            <div className="mainTitleContainer">
                <h1 className="mainTitle">PREDICT YOUR ESPORTS</h1>
            </div>
            <div className="subTitleContainer">
                <h3 className="subTitle">AI-Powered LoL Team Forecaster</h3>
            </div>
            <div className="buttonContainer" onClick={handleClick}>
                <h3 className="buttonText">Discover your Team</h3>
            </div>
            <video className="videoContainer " src={video} muted autoPlay loop />
            {/* <video className="videoContainer2 " src={worldsVideo} autoPlay loop /> */}
           
        </div>
    )
}