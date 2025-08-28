import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const { logar } = useAuth();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    logar(usuario, senha);
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        value={usuario}
        onChangeText={setUsuario}
        style={styles.inputLogin}
      />
      <TextInput
        value={senha}
        onChangeText={setSenha}
        style={styles.inputLogin}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.submitLogin}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  inputLogin: {
    width: 200,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  submitLogin: {
    backgroundColor: "#",
  },
});
