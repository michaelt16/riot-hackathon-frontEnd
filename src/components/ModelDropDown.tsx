import React, { useEffect, useState } from "react"
interface Model{
    name:string,
    id:string
}

export default function ModelDropDown ():JSX.Element{
    const models:Model[] = [{name:"Bayesian Model",id:"bayesian"}, {name:"Logistic Regression",id:"logisticregression"}, {name:"Random Forest",id:"randomforest"}]
    return(
        <div>

        </div>
    )
}