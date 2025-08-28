import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { getReactNativePersistence } from "@firebase/auth-react-native";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { auth } from "../config/firebase";

// Instância global do Axios
export const api = axios.create({
  baseURL: "http://192.168.0.10:3000", // Sua API Node
});

interface AuthContextData {
  usuario: User | null;
  logar: (email: string, senha: string) => Promise<void>;
  cadastrar: (email: string, senha: string) => Promise<void>;
  deslogar: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<User | null>(null);

  async function logar(email: string, senha: string) {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, senha);
      setUsuario(cred.user);

      // Pega o token JWT
      const token = await cred.user.getIdToken();

      // Configura Axios para enviar token em todas as requisições
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async function cadastrar(email: string, senha: string) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, senha);
      setUsuario(cred.user);

      // Pega o token JWT
      const token = await cred.user.getIdToken();

      // Configura Axios para enviar token em todas as requisições
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async function deslogar() {
    try {
      await signOut(auth);
      setUsuario(null);
      delete api.defaults.headers.common["Authorization"]; // Remove token do Axios
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  return (
    <AuthContext.Provider value={{ usuario, logar, cadastrar, deslogar }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
