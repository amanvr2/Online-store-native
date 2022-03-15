import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AboutScreen from "../screens/about";

const Stack = createNativeStackNavigator();

function AboutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}

export default AboutStack;
