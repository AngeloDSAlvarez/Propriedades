import { createDrawerNavigator } from "@react-navigation/drawer";

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
        options={{}}
      />
    </Drawer.Navigator>
  );
};
