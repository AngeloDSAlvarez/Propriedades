import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/LeiteGestorStack";

type LeiteStackGestor = StackNavigationProp<RootStackParamList>

export const LeiteGestor = () => {
    const navigation = useNavigation<LeiteStackGestor>();
    return (
        <View>
            <TouchableOpacity onPress={ () => navigation.navigate('LeiteAdicionarColeta') }>
                <Text>Adicionar coleta</Text>
            </TouchableOpacity>

        </View>
    );
}