import React from "react";
import "./Navbar.css"
import riotFist from "../assets/riot_fist.png"
import { useNavigate } from "react-router-dom";
export default function Navbar(): JSX.Element {
    const navigate = useNavigate()
    const handleClickLogo = ()=>{
        try{
            console.log("running")
            navigate("/")
        }catch(e){
            console.log("not running")
        }
    }

    return(
        <div className="container">
            <img className="riotfist" onClick ={handleClickLogo}src ={riotFist}/>
        </div>
    )
}