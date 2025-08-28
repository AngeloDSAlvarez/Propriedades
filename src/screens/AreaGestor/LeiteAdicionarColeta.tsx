import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Platform, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";


export const LeiteAdicionarColeta = () => {
    const [quantidade, setQuantidade] = useState('0');
    const [date, setDate] = useState<Date>(new Date());
    const [show, setShow] = useState(false);

    const onChange = (_event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);
    };

    const handleColeta = () => {
        
    }

    return (
        <View style={styles.container}>
            <View>
                <Text>Quantidade coletada (em litros)</Text>
                <TextInput
                    value={quantidade}
                    onChangeText={setQuantidade}
                />
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
                <TouchableOpacity onPress={ handleColeta }>
                    <Text>Adicionar coleta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    label: {
        fontSize: 16,
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 12,
        justifyContent: "center"
    },
});