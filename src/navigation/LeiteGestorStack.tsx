import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Gestor } from "../screens/AreaGestor/Leite/Gestor";
import { AdicionarColeta } from "../screens/AreaGestor/Leite/AdicionarColeta";
import { EditarColeta } from "../screens/AreaGestor/Leite/EditarColeta";
import { GerarRelatorio } from "../screens/AreaGestor/Leite/GerarRelatorio";
import { ColetaLeite } from "../../@types/types";

export type RootStackParamList = {
  LeiteGestor: undefined;
  LeiteAdicionarColeta: undefined;
  LeiteEditarColeta: { coleta: ColetaLeite };
  GerarRelatorio: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const LeiteGestorStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LeiteGestor" component={Gestor} />
      <Stack.Screen
        name="LeiteAdicionarColeta"
        component={AdicionarColeta}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="LeiteEditarColeta"
        component={EditarColeta}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="GerarRelatorio"
        component={GerarRelatorio}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};
