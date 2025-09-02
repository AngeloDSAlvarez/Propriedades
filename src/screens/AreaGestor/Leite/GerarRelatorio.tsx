import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

// Define a cor primária do aplicativo como uma constante para facilitar a manutenção
const COR_PRIMARIA = "#00592d";

export const GerarRelatorio = () => {
  // Estados para armazenar os valores dos filtros
  const [dataInicio, setDataInicio] = useState<Date>(new Date());
  const [dataFim, setDataFim] = useState<Date>(new Date());
  const [quantidadeInicio, setQuantidadeInicio] = useState<string>();
  const [quantidadeFim, setQuantidadeFim] = useState<string>();
  const [precoFixo, setPrecoFixo] = useState(false);
  const [preco, setPreco] = useState<string>();
  // controlar o filtro de quantidade
  const [usarFiltroQuantidade, setUsarFiltroQuantidade] = useState(false);

  // Estados para controlar a visibilidade dos seletores de data
  const [showDatePickerInicio, setShowDatePickerInicio] = useState(false);
  const [showDatePickerFim, setShowDatePickerFim] = useState(false);

  // Função para lidar com a mudança de data de início
  const onChangeDataInicio = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dataInicio;
    // Oculta o seletor em Android, mas mantém visível em iOS (comportamento padrão)
    setShowDatePickerInicio(Platform.OS === "ios");
    setDataInicio(currentDate);
  };

  // Função para lidar com a mudança de data de fim
  const onChangeDataFim = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dataFim;
    setShowDatePickerFim(Platform.OS === "ios");
    setDataFim(currentDate);
  };

  // Função utilitária para formatar a data para exibição
  const formatarData = (date: Date) => {
    return date.toLocaleDateString("pt-BR");
  };

  return (
    // Contêiner principal da tela
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerar Relatórios</Text>

      {/* Input de Data de Início */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Data de Início</Text>
        {/* Botão que, quando pressionado, mostra o seletor de data */}
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePickerInicio(true)}
        >
          <Text style={styles.inputText}>{formatarData(dataInicio)}</Text>
        </TouchableOpacity>
        {/* Renderização condicional do seletor de data */}
        {showDatePickerInicio && (
          <DateTimePicker
            value={dataInicio}
            mode="date"
            display="default"
            onChange={onChangeDataInicio}
          />
        )}
      </View>

      {/* Input de Data de Fim */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Data de Fim</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePickerFim(true)}
        >
          <Text style={styles.inputText}>{formatarData(dataFim)}</Text>
        </TouchableOpacity>
        {showDatePickerFim && (
          <DateTimePicker
            value={dataFim}
            mode="date"
            display="default"
            onChange={onChangeDataFim}
          />
        )}
      </View>

      {/* Botão para ativar o filtro de quantidade */}
      <View style={styles.inputGroup}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setUsarFiltroQuantidade(!usarFiltroQuantidade)}
        >
          {/* Ícone que muda com base no estado do filtro */}
          <Ionicons
            name={usarFiltroQuantidade ? "checkbox-outline" : "square-outline"}
            size={24}
            color={usarFiltroQuantidade ? COR_PRIMARIA : "#888"}
          />
          <Text style={styles.label}>Filtrar por quantidade de litros</Text>
        </TouchableOpacity>

        {/* Renderiza os inputs de quantidade apenas se o filtro estiver ativo */}
        {usarFiltroQuantidade && (
          <View style={styles.quantidadeInputRow}>
            <TextInput
              style={[styles.textInput, styles.halfInput]}
              value={quantidadeInicio}
              onChangeText={setQuantidadeInicio}
              placeholder="Mínima"
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.textInput, styles.halfInput]}
              value={quantidadeFim}
              onChangeText={setQuantidadeFim}
              placeholder="Máxima"
              keyboardType="numeric"
            />
          </View>
        )}
      </View>

      {/* Checkbox e Input de Preço Fixo */}
      <View style={styles.inputGroup}>
        {/* O TouchableOpacity lida com o toque para alternar o estado de precoFixo */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setPrecoFixo(!precoFixo)}
        >
          {/* Ícone que muda com base no estado de precoFixo */}
          <Ionicons
            name={precoFixo ? "checkbox-outline" : "square-outline"}
            size={24}
            color={precoFixo ? COR_PRIMARIA : "#888"}
          />
          <Text style={styles.label}>Usar preço fixo</Text>
        </TouchableOpacity>
        {/* Renderiza o input de preço apenas se precoFixo for verdadeiro */}
        {precoFixo && (
          <TextInput
            style={styles.textInput}
            value={preco}
            onChangeText={setPreco}
            placeholder="Preço por litro"
            keyboardType="numeric"
          />
        )}
      </View>

      {/* Botão de Gerar Relatório */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log("Gerar relatório")}
      >
        <Text style={styles.buttonText}>Gerar Relatório</Text>
      </TouchableOpacity>
    </View>
  );
};

// Objeto de estilo
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    padding: 24,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: COR_PRIMARIA,
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
    gap: 8, // Espaçamento entre os elementos do grupo
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    justifyContent: "center",
    minHeight: 48,
  },
  inputText: {
    fontSize: 16,
    color: "#333",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  quantidadeInputRow: {
    flexDirection: "row",
    gap: 10,
  },
  halfInput: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  button: {
    backgroundColor: COR_PRIMARIA,
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
