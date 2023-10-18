import React, { useEffect, useState } from "react"
import "./Standings.css"
import axios from 'axios';
import fileDownload from 'js-file-download'

interface teamRecord{
  wins:number,
  losses:number
}
export default function Standings(props){
      // const standingsProp = props.standingsData?.[0].tournamentStandings
      const [standingsData,setStandingsData] =useState()
      const imgLink = "http://127.0.0.1:5000/api/icon/"
      const generateImage = (teamName: string)=>{
        // gonna get it from db
        return `${imgLink}${teamName}`
      }
     
      useEffect(() => {
        
        console.log("TEST",props.data);
        setStandingsData(props.data)
      }, [props]);
      
      const formatWinLose = (teamRecord: teamRecord)=>{
       
        return `${teamRecord.wins}W - ${teamRecord.losses}L`
      }

      console.log("TESTSTETS",standingsData)
    return(
        <div >
          <div className="handleOverflow">
            {
              standingsData?.map((team,index:number)=>{
              const teamInfo = team.team_info
              const teamRecord = team.record
              return(
                      <div className="standingsRow textFont " key={index}>
                          <h1 className="standingsFontSize">{index+1}. </h1>
                          <div className="teamContainer">
                            <img className ="teamLogo"/>
                            <div className="teamFormatted">
                              <h3 className="teamFontSize">{teamInfo.name}</h3>
                              <h3 className="winrateFontSize">
                                {teamRecord !== undefined ? formatWinLose(teamRecord):''}
                              </h3>
                            </div>
                            
                          </div>
                       
                          
                      </div>
                  )
            })
            }
                
                </div>
        </div>
    )
}

 