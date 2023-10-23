import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const LeaguesContext = createContext([]);

export function LeaguesProvider({ children }:any) {
  const [leaguesArr, setLeaguesArr] = useState([]);

  useEffect(() => {
    try {
      axios.get("http://matthewproject.click/leagues")
        .then(response => {
          setLeaguesArr(response.data);
        })
        .catch(e => {
          console.log("leaguesErr:", e);
        });
    } catch (e) {
      console.log("leaguesErr:", e);
    }
  }, []);

  return (
    <LeaguesContext.Provider value={leaguesArr}>
      {children}
    </LeaguesContext.Provider>
  );
}

// Custom hook to access leagues data
export function useLeagues() {
  return useContext(LeaguesContext);
}
