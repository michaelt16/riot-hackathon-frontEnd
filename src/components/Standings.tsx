import React, { useEffect, useState } from "react"
import "./Standings.css"
import axios from 'axios';
import fileDownload from 'js-file-download'

export default function Standings(){
    const [mockData, setMockData] = useState([
        { name: "C9"},
        { name: "GG"},
        { name: "EG"},
        { name: "TL"},
        { name: "NRG"},
        { name: "TSM"},
        { name: "DIG"},
        { name: "100"},
        { name: "FLY"},
        { name: "IMT"}
      
      ]);
      
      const imgLink = "http://127.0.0.1:5000/api/icon/"
      const generateImage = (teamName: string)=>{
        return `${imgLink}${teamName}`
      }
      const tournamentStandingsLink = "http://127.0.0.1:5000/api/tournament-standings/"
      // useEffect(()=>{
      //   axios.get(tournamentStandingsLink)
      // },[])
      
    return(
        <div>
         
            {
              mockData.map((team,index)=>{
              return(
                      <div className="standingsRow textFont " key={index}>
                          <h1 className="standingsFontSize">{index+1}. </h1>
                          <div className="teamContainer">
                            <img className ="teamLogo" src = {generateImage(team.name)}/>
                            <h3 className="teamFontSize">{team.name}</h3>
                          </div>
                       
                          
                      </div>
                  )
            })
            }
                
          
        </div>
    )
}

 