import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import axios from "axios";
import { auth } from "../config/firebase";

// Instância global do Axios
export const api = axios.create({
  baseURL: "http://10.0.2.2:3000", // API
});

interface AuthContextData {
  usuario: User | null;
  loading: boolean;
  logar: (email: string, senha: string) => Promise<void>;
  cadastrar: (email: string, senha: string) => Promise<void>;
  deslogar: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Monitora o estado de autenticação do Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUsuario(user);
      if (user) {
        // Esta função vai ser chamada tanto no login quanto na renovação do token!
        try {
          const token = await user.getIdToken();
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } catch (error) {
          console.error("Erro ao obter o token:", error);
        }
      } else {
        delete api.defaults.headers.common["Authorization"];
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  async function logar(email: string, senha: string) {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      // O `onAuthStateChanged` vai atualizar o estado do `usuario`
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async function cadastrar(email: string, senha: string) {
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      // O `onAuthStateChanged` vai atualizar o estado do `usuario`
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async function deslogar() {
    try {
      await signOut(auth);
      // O `onAuthStateChanged` vai atualizar o estado do `usuario` para `null`
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  return (
    <AuthContext.Provider
      value={{ usuario, loading, logar, cadastrar, deslogar }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
