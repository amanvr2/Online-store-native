import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/customer/SplashScreen";
import SigninScreen from "../screens/customer/SignInScreen";
import SignupScreen from "../screens/customer/SignUpScreen";
import HomeScreen from "../screens/customer/HomeScreen";

const Stack = createNativeStackNavigator();

function CustomerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Splash"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignIn"
        component={SigninScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignupScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}

export default CustomerStack;
