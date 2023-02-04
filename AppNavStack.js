import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "./papers/Splash";
import Signup from "./papers/Signup";
import Signin from "./papers/Signin";

import Dashboard from "./papers/Dashboard";

const Stack = createNativeStackNavigator();

export const NavStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};

export default NavStack;
