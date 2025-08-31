import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import styles from "./CadastrarStyles";

export const Cadastrar = () => {
  const { cadastrar } = useAuth();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = () => {
    cadastrar(usuario, senha);
  };

  return (
   <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 20 })}
      enabled
    >
      <Text style={{ fontSize: 24, color: "#00592d", marginBottom: 20 }}>Cadastre-se</Text>
      <TextInput
        value={usuario}
        onChangeText={setUsuario}
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#666"
      />
      <TextInput
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#666"
        secureTextEntry
      />
      <TouchableOpacity onPress={handleCadastro} style={styles.submit}>
        <Text style={styles.submitText}>ENTRAR</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
