import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const leaguesPropsContext = createContext(null)

export const useLeagues = () => {
    return useContext(leaguesPropsContext);
  };
  
