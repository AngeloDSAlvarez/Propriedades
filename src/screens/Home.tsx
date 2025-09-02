import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { useAuth } from "../context/AuthContext";

export const Home = () => {
  const { deslogar } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.containerTituloApp}>
        <Text style={styles.titulo}>Propriedades</Text>
        <Text style={styles.descTitulo}>Gestão Rural</Text>
      </View>

      <TouchableOpacity onPress={deslogar}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTituloApp: {
    backgroundColor: "#00592d",
    height: 80,
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  descTitulo: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});
