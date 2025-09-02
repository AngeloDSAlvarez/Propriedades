import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ColetaLeite } from "../../@types/types";
import { useNavigation } from "@react-navigation/native";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/LeiteGestorStack";

export interface Props {
  coleta: ColetaLeite;
}
type LeiteStackGestor = StackNavigationProp<RootStackParamList>;

export const LeiteLista = ({ coleta }: Props) => {
  const navigation = useNavigation<LeiteStackGestor>();
  // Sua função de formatação de data aqui
  const formatarTimestampParaData = (timestamp: string): string => {
    const data = new Date(timestamp);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <TouchableOpacity
      style={styles.coletaCard}
      onPress={() =>
        navigation.navigate("LeiteEditarColeta", { coleta: coleta })
      }
    >
      <View style={styles.infoGroup}>
        <Text style={styles.label}>Data:</Text>
        <Text style={styles.dataText}>
          {formatarTimestampParaData(coleta.data)}
        </Text>
      </View>
      <View style={styles.infoGroup}>
        <Text style={styles.label}>Litros:</Text>
        <Text style={styles.dataText}>{coleta.quantidade}</Text>
      </View>
      <View style={styles.infoGroup}>
        <Text style={styles.label}>Preço:</Text>
        <Text style={styles.dataText}>R$ {coleta.preco}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  coletaCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 6,
    marginHorizontal: 16,
    // Sombra para Android
    elevation: 3,
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoGroup: {
    alignItems: "center",
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
    fontWeight: "500",
  },
  dataText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00592d",
  },
});
