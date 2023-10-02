import React from "react";
import Navbar from "../components/Navbar";
import video from "../assets/lolesports_trailer.mp4"
import "./TitlePage.css"
export default function TitlePage(): JSX.Element {
    
    return(
        <div className="titlePageContainer">
            <Navbar/>
            <video className="videoContainer" src={video} muted autoPlay loop />
        </div>
    )
}