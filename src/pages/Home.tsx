import React from "react"
import Navbar from "../components/Navbar"
import "../pages/Home.css"
import leaguesLogo from "../assets/leaguesLogo.png"
import worldLogo from "../assets/worldsLogo.png"
export default function Home(): JSX.Element {
    return(
        <div>
            <Navbar/>
             <div className="titleContainer">
                <h1 className="titleText">SELECT A FEATURE</h1>
             </div>
             <div className="featureContainer">
                <div className="selection">
                   <img className="leaguesImage" src = {leaguesLogo}/>
                   
                </div>
                <div className="selection">
                <img className="worldsImage" src = {worldLogo}/>
                   
                </div>
                <div className="selection">
                   
                   
                </div>
             </div>
        </div>
    )

}