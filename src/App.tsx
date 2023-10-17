import React, { useEffect } from "react";
import TitlePage from "./pages/LandingPage"
import AppRouter from "./router/AppRouter";
import "@fontsource/bebas-neue"
import "@fontsource/montserrat";
import "./reset.css"
import axios from "axios";
export default function App(): JSX.Element {

//   useEffect(() => {
//     axios.get("http://matthewproject.click/leagues")
//     .then(response=>{
//         console.log(response.data)
//         setTeamOrderData(response.data)
//     })
// }, []);

  return(
    <div>
      <AppRouter/>
    </div>
  )
}
