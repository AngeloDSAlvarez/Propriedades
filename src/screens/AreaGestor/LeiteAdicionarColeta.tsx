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

export const LeiteAdicionarColeta = () => {
  const [quantidade, setQuantidade] = useState("0");
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState(false);
  const [preco, setPreco] = useState("0");

  const onChange = (_event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const handleColeta = () => {};

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

  return (
    <View style={styles.container}>
      <View>
        <Text>Quantidade coletada (em litros)</Text>
        <TextInput value={quantidade} onChangeText={setQuantidade} />
      </View>

      <View>
        <Text style={styles.label}>Data</Text>

        <TouchableOpacity style={styles.input} onPress={() => setShow(true)}>
          <Text>{date.toLocaleDateString("pt-BR")}</Text>
        </TouchableOpacity>

        {show ? (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        ) : null}
      </View>
      <View>
        <Text>Preço por litro</Text>
        <TextInput
          value={preco}
          onChangeText={(value) => setPreco(formatarParaBRL(value))}
          keyboardType="numeric"
        />
      </View>

      <View>
        <TouchableOpacity onPress={handleColeta}>
          <Text>Adicionar coleta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    justifyContent: "center",
  },
});
