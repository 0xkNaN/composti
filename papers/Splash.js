import { View } from "react-native";
import React, { useCallback, useState, useEffect } from "react";

import Logo from "../assets/logo.svg";

const AppSplashScreen = ({ navigation }) => {
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (authLoaded) {
      navigation.replace("Signup");
    }
  }, [authLoaded, navigation]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}>
      <Logo width={89} height={86} />
    </View>
  );
};

export default AppSplashScreen;
