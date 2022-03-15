import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryScreen from "../screens/category";
import ProductScreen from "../screens/products";

const Stack = createNativeStackNavigator();

function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Products" component={ProductScreen} />
    </Stack.Navigator>
  );
}

export default AdminStack;
