import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import AdminStack from "./adminStack";
import AboutStack from "../routes/aboutStack";
import CustomStack from "../routes/customerStack";

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="AdminStack" component={AdminStack} />
        <Drawer.Screen name="AboutStack" component={AboutStack} />
        <Drawer.Screen name="Customer" component={CustomStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
