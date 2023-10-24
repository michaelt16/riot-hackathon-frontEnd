import React, { useEffect, useState } from "react"
import "./Standings.css"
import axios from 'axios';
import fileDownload from 'js-file-download'

interface teamRecord{
  wins:number,
  losses:number
}
export default function ModelStandings(props){
      
      const [modelStandingsData,setModelStandingsData] =useState()
      
     
      useEffect(() => {
        console.log("MODEL TEST",props.data);
        setModelStandingsData(props.data)
      }, [props]);
      
    //   const formatWinLose = (teamRecord: teamRecord)=>{
       
    //     return `${teamRecord.wins}W - ${teamRecord.losses}L`
    //   }

     
    return(
        <div >
          <div className="handleOverflow">
            {
                modelStandingsData?.map((team,index:number)=>{
                    return(
                                  <div className="standingsRow textFont " key={index}>
                                      <h1 className="standingsFontSize">{index+1}. </h1>
                                      <div className="teamContainer">
                                        <img className ="teamLogo"/>
                                        <div className="teamFormatted">
                                          <h3 className="teamFontSize">
                                           {team.team_name !== undefined ? team.team_name :''}
                                          </h3>
                                          <h3 className="winrateFontSize">
                                            Expected Wins: {Math.round(team.expected_wins)}
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

 