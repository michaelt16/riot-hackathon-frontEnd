import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TitlePage from "../pages/TitlePage";
import Home from "../pages/Home"
export default function AppRouter(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<TitlePage />} />
            <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    )
}