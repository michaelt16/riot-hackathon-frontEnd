import React from "react"
import riotFist from "../assets/riot_fist.png"
import "./Load.css"
export default function Load():JSX.Element{
    return(
        <div className="loaderContainer">

                <div>
                    <img className="riotLogo"src ={riotFist}/>
                    <div className="loader"></div>
                </div>
              
        </div>
    )
}