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
        const [mockIcon,setMockIcon] = useState({})
      useEffect(() => {
        const handleDownload = (teamName:string ) => {
          const url = `http://127.0.0.1:5000/api/icon/${teamName}`;
          axios.get(url, { responseType: 'json' }) 
            .then((res) => {
              console.log(res.data.url)
              fileDownload(res.data.url, `${teamName}.png`);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        };
      
        // handleDownload("C9")
        // mockData.forEach((team)=>{
        //   try{
        //     handleDownload(team.name,`${team.name}.PNG`)
        //   }catch(e){
        //     console.log("did not download")
        //   }
          
        // })
        

      }, []);
      
    return(
        <div>
           {/* <img src ="https://static.nocookie.net/lolesports_gamepedia_en/images/8/88/Cloud9logo_square.png/revision/latest?cb=20230426052413.jpg"/> */}
            {/* <img src ="https://static.lolesports.com/teams/1631820065346_cloud9-2021-worlds.png"/> */}
            {
              mockData.map((team,index)=>{
              return(
                      <div className="standingsRow textFont " key={index}>
                          <h1 className="standingsFontSize">{index+1}. </h1>
                          <h3 className="teamFontSize">{team.name}</h3>
                        
                      </div>
                  )
            })
            }
                
          
        </div>
    )
}

 