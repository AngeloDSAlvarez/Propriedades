import { createDrawerNavigator } from "@react-navigation/drawer";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { Gestor } from "../screens/AreaGestor/Gestor";
import { GestorAnimal } from "../screens/AreaGestor/GestorAnimal";
import { LeiteGestorStack } from "../navigation/LeiteGestorStack";

const Drawer = createDrawerNavigator();

export const GestorDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Gestor">
      <Drawer.Screen name="Gestor" component={Gestor} options={{}} />
      <Drawer.Screen
        name="GestaoAnimal"
        component={GestorAnimal}
        options={{}}
      />
      <Drawer.Screen
        name="GestaoLeite"
        component={LeiteGestorStack}
        options={({ route }) => {
          // Pega o nome da rota focada dentro da pilha de navegação aninhada (LeiteGestorStack)
          const routeName = getFocusedRouteNameFromRoute(route);

          if (
            routeName === "LeiteAdicionarColeta" ||
            routeName === "LeiteEditarColeta" ||
            routeName === "GerarRelatorio"
          ) {
            return { headerShown: false };
          } else {
            // Para as outras rotas, como LeiteHome, o header do Drawer fica visível
            return { headerShown: true };
          }
        }}
      />
    </Drawer.Navigator>
  );
};
