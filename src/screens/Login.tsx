import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./LoginStyles";

export const Login = () => {
  const navigation = useNavigation();
  const { logar } = useAuth();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = () => {
    logar(usuario, senha);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 20 })}
      enabled
    >
      <View style={{ width: "100%", alignItems: "center", gap: 15 }}>
        <Text style={{ fontSize: 24, color: "#00592d", marginBottom: 20 }}>
          Entre no Propriedades
        </Text>

        <View style={styles.containerInput}>
          <Text style={styles.textInput}>Login</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUsuario}
            value={usuario}
            autoCapitalize="none"
            textAlignVertical="bottom"
          />
        </View>
        <View style={styles.containerSenha}>
          <Text style={styles.textInput}>Senha</Text>
          <TextInput
            style={styles.inputSenha}
            onChangeText={setSenha}
            value={senha}
            secureTextEntry={!mostrarSenha}
            onSubmitEditing={handleLogin}
            textAlignVertical="bottom"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setMostrarSenha(!mostrarSenha)}
            hitSlop={5}
          >
            <Ionicons
              name={mostrarSenha ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.submit}>
          <Text style={styles.submitText}>ENTRAR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Cadastrar")}>
          <Text style={styles.linkText}>Não possui uma conta ainda?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
