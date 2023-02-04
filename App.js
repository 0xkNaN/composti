import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { MD3LightTheme as Theme, Provider } from "react-native-paper";

import AppNavStack from "./AppNavStack";

const theme = { ...Theme, colors: { ...Theme.colors, primary: "tomato", secondary: "yellow" } };

const App = () => {
  return (
    <Provider theme={theme}>
      <StatusBar animated={true} backgroundColor="#fff" barStyle="default" showHideTransition="none" hidden={false} />
      <NavigationContainer>
        <AppNavStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
