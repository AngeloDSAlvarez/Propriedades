import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { LeiteGestor } from "../screens/AreaGestor/LeiteGestor";
import { LeiteAdicionarColeta } from "../screens/AreaGestor/LeiteAdicionarColeta";

export type RootStackParamList = {
    LeiteGestor: undefined;
    LeiteAdicionarColeta: undefined;
}

const Stack = createStackNavigator<RootStackParamList>();

export const LeiteGestorStack = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LeiteGestor" component={LeiteGestor} />
            <Stack.Screen name="LeiteAdicionarColeta" component={LeiteAdicionarColeta} />
        </Stack.Navigator>        
    );
}