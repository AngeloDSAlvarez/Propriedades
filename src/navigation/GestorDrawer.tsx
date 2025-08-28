import { createDrawerNavigator } from '@react-navigation/drawer';

import { Gestor } from '../screens/AreaGestor/Gestor';
import { GestorAnimal } from '../screens/AreaGestor/GestorAnimal';
import { LeiteGestorStack } from '../navigation/LeiteGestorStack';

const Drawer = createDrawerNavigator();

export const GestorDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName='Gestão' >
      <Drawer.Screen name="Gestão" component={Gestor} options={{  }} />
      <Drawer.Screen name="Gestão Animal" component={GestorAnimal} options={{  }} />
      <Drawer.Screen name="Gestão Leite" component={LeiteGestorStack} options={{  }} />
    </Drawer.Navigator>
  );
}