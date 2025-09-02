import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/LeiteGestorStack";

import { api } from "../../../context/AuthContext";
import { useAuth } from "../../../context/AuthContext";
import { LeiteLista } from "../../../components/LeiteLista";

type LeiteStackGestor = StackNavigationProp<RootStackParamList>;

import { ColetaLeite } from "../../../../@types/types";

export const Gestor = () => {
  const navigation = useNavigation<LeiteStackGestor>();
  const { usuario } = useAuth();
  const [coletasLeite, setColetasLeite] = useState<ColetaLeite[]>();

  useEffect(() => {
    consultaColetasLeite();
  }, []);

  async function consultaColetasLeite() {
    const userId = usuario?.uid;
    const url = `/propriedades/${userId}/coletas-leite`;

    const response = await api.get(url);

    setColetasLeite(response.data);
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LeiteAdicionarColeta")}
        >
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Adicionar coleta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={consultaColetasLeite}>
          <Ionicons name="refresh-circle-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Atualizar coletas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("GerarRelatorio")}
        >
          <Ionicons name="refresh-circle-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Gerar Relatório</Text>
        </TouchableOpacity>
      </View>

      {coletasLeite ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={coletasLeite}
            keyExtractor={(item) => item.id}
            renderItem={({ item }: any) => <LeiteLista coleta={item} />}
            style={{ flex: 1 }}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20, // Garante que não fiquem colados nas bordas
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#00592d",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: "center",
    flex: 1, // Faz com que os botões tenham a mesma largura
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
