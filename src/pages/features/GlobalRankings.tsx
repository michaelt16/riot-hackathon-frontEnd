import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../css/GlobalRankings.css"
import { useNavigate } from "react-router-dom";
import Standings from "../../components/Standings";
import Load from "../../components/Load";
import axios from "axios";
import ModelStandings from "../../components/ModelStandings";
interface Model{

    name:string,
    id:string
}
export default function GlobalRankings(){
    const [modelStandingsData, setModelStandingsData] = useState()
    const [dropDown,setDropdownToggle]= useState(false)
    const [modelName,setModelName]= useState("Bayesian model")
    const [modelData,setModelData]=useState<Model>({name:"Bayesian Model",id:"bayesian"})
    const numbers = [10, 50, 100];
    const [amount,setAmount]=useState<number>(10)
    const models:Model[] = [{name:"Bayesian Model",id:"bayesian"}, {name:"Logistic Regression",id:"logisticregression"}, {name:"Random Forest",id:"randomforest"}]
    const navigate = useNavigate()
    const handleReturn = ()=>{
        navigate("/home")
    }
    const mockData ="s"
    const dropDownClick = (e)=>{
        console.log("dropdownclicked")
        setDropdownToggle(!dropDown)
    }
    useEffect(()=>{
       
    },[])
    
    const toggleAmount = (number:number)=>{
        setAmount(number)
    }
    // useEffect(()=>{
    //     console.log(amount)
    // },[amount])
    // useEffect(()=>{
    //     console.log(modelData)
    // },[modelData])
    const toggleModel = (model:Model)=>{
        setModelName(model.name)
        setModelData(model)
    }
    useEffect(()=>{
        setModelStandingsData(undefined)  
        const apiLink = "http://api.lolpowerrankings.click/model/globalRankings"
        const params = {
            model:modelData?.id,
            n_teams:amount
        }
        console.log(params)
        try{
            axios.get(apiLink,{params})
            .then(response=>{
                console.log("MODEL RESP",response.data);
                setModelStandingsData(response.data)  
            })
        }catch(e){
            console.log("notworking")
        }
       
    },[modelData,amount])
   
    
    return(
        <div className="globalRankingsPage">
             <Navbar/>
             <div className="header">
                <div className="returnToMain">
                    <div className="returnButton" onClick={handleReturn}>Return</div>
                </div>
             <div className="headerTitleContainer">
                
                <h1>Global Rankings</h1>
             </div>

            </div>
            <div className="globalRankingsStandingsContainer">
                <div className="topContainer">
                    <div className="numberContainer">
                    {numbers.map((number, index) => (
                        <div key={index} className="numberBox" onClick={()=>toggleAmount(number)}>
                        {number}
                        </div>
                 ))}
                    </div>
                <div className="dropdownContainer centerButton"  onClick={(e)=> dropDownClick(e)}>
                    <div className="dropdownBox"> Model: {modelName}</div>
                                    {
                                        dropDown?(
                                            <div className="dropdownExpandedContainer">

                                                {models.map((model)=>{
                                                    return(
                                                        // add onclick here
                                                        <div className="dropDownExpandedBox" onClick={()=>toggleModel(model)}>
                                                            {model.name}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        ):
                                        (
                                            <div></div>
                                        )
                        }
                         </div>
                    </div>
                {modelStandingsData?(
                    <div className="globalStandingsHeader">
                        
                         <ModelStandings data={modelStandingsData}/>
                    </div>

                ):(
                    <div className="centerLoader">

                    <Load/>

                    </div>
                    
                )}
                </div>
            
            <Footer/>
        </div>
    )
}