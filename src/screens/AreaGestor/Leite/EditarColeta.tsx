import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { api } from "../../../context/AuthContext";
import { useAuth } from "../../../context/AuthContext";
import { ColetaLeite } from "../../../../@types/types";

export const EditarColeta = () => {
  const formatarParaNumero = (valorFormatado: string): number => {
    // Remove o símbolo "R$", espaços, e o separador de milhar "."
    const valorLimpo = valorFormatado.replace(/[^0-9,]/g, "");

    // Substitui a vírgula "," por um ponto "."
    const valorComPonto = valorLimpo.replace(",", ".");

    // Converte para número
    return parseFloat(valorComPonto);
  };
  const formatarParaBRL = (valor: string) => {
    // Remove tudo que não for número
    const somenteNumeros = valor.replace(/\D/g, "");

    if (!somenteNumeros) return "";

    // Converte para número em centavos
    const numero = parseInt(somenteNumeros, 10) / 100;

    // Formata em Real Brasileiro
    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Pegue o objeto de rota
  const route = useRoute();

  // Desestruture o parâmetro 'coleta' da rota

  const { coleta } = route.params as { coleta: ColetaLeite };
  const [quantidade, setQuantidade] = useState(coleta.quantidade);
  const [date, setDate] = useState<Date>(new Date(coleta.data));
  const [show, setShow] = useState(false);
  const [preco, setPreco] = useState(formatarParaBRL(coleta.preco.toString()));

  const navigation = useNavigation();
  const { usuario } = useAuth();
  const onChangeData = (_event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  // ==== enviar edição ao banco a coleta de leite ====
  const handleEditarColeta = async () => {
    if (!quantidade || !date || !preco) {
      return Alert.alert("Coleta não enviada", "Preencha todos os campos");
    }
    try {
      const userId = usuario?.uid;
      const coletaId = coleta.id;

      const url = `/propriedades/${userId}/coletas-leite/${coletaId}`;

      const precoBanco = formatarParaNumero(preco);
      const dados = {
        quantidade: quantidade,
        data: date,
        preco: precoBanco,
      };

      const response = await api.patch(url, dados);

      if (response) {
        Alert.alert("Coleta editada", "Coleta editada com sucesso");
        navigation.goBack();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro na requisição:",
          error.response?.data || error.message
        );
        throw new Error(error.response?.data || "Erro ao criar arquivo.");
      } else {
        console.error("Erro inesperado:", error);
        throw new Error("Ocorreu um erro inesperado.");
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Quantidade coletada (em litros)</Text>
        <TextInput
          style={styles.textInput}
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
          placeholder="0"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Data</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShow(true)}
        >
          <Text style={styles.dateInputText}>
            {date.toLocaleDateString("pt-BR")}
          </Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeData}
          />
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Preço por litro</Text>
        <TextInput
          style={styles.textInput}
          value={preco.toString()}
          onChangeText={(value) => setPreco(formatarParaBRL(value))}
          keyboardType="numeric"
          placeholder="R$ 0,00"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEditarColeta}>
        <Text style={styles.buttonText}>Editar coleta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    gap: 20, // Espaçamento entre os grupos de input
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
  },
  dateInputText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#00592d",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
