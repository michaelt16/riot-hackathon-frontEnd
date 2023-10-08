import React from "react"
import brush from "../assets/brush.png"
import "./Footer.css"
export default function Footer ():JSX.Element{
    return(
        <div className="footerContainer">
            
            <div className="footerBox">
                 <img className="brushImage"src ={brush}/>
            </div>
        </div>
       
    )
}