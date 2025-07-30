import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1Define os tipos para o contexto
interface AuthContextType {
  userToken: string | null;
  isLoading: boolean;
  login: (login: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Cria o contexto com tipo
export const AuthContext = createContext<AuthContextType>({
  userToken: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

// Define tipo dos filhos do provider
interface AuthProviderProps {
  children: ReactNode;
}

// Implementa o provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [loginAut, setLoginAut] = useState("Angelo");
  const [senhaAut, setSenhaAut] = useState("Ang22");

  const login = async (login: string, senha: string) => {

    if (login == loginAut && senha == senhaAut) {
        setUserToken(login);
        await AsyncStorage.setItem('userToken', login);
    } else {
        return alert("Erro ao entrar, verifique credenciais");
    }
  };

  const logout = async () => {
    setUserToken(null);
    await AsyncStorage.removeItem('userToken');
  };

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setUserToken(token);
    setIsLoading(false);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

  
};
export const useAuth = () => useContext(AuthContext);
