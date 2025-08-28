import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ColetaLeite } from '../../@types/types';
// Define os tipos para o contexto
interface AppContextType {
    ColetasLeite: ColetaLeite[]
}

// Cria o contexto com tipo
export const AppContext = createContext<AppContextType>({
  
});

// Define tipo dos filhos do provider
interface AppProviderProps {
  children: ReactNode;
}

// Implementa o provider
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  const login = async (login: string, senha: string) => {
    if (login) {
        setUserToken(login);
        await AsyncStorage.setItem('userToken', login);
    }
  };


  return (
    <AppContext.Provider value={{  }}>
      {children}
    </AppContext.Provider>
  );

  
};
export const useApp = () => useContext(AppContext);
