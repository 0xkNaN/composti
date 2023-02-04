import { useEffect, useState } from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Platform, StatusBar, View } from "react-native";
import { TouchableRipple, Surface, Text } from "react-native-paper";

import Topbar from "../components/common/Topbar";
import Navbar from "../components/common/Navbar";

import HomeTab from "../components/dashboard/Home";

import { GET_DATA } from "../services";

const Dashboard = ({ navigation }) => {
  const [tab, setTab] = useState("__home");
  const [data, setData] = useState({ loading: true, products: [] });

  const getData = async () => {
    const products = await GET_DATA();
    setData({ loading: false, products });

    // console.log("#DATA :: ", products.length);
    // console.log("#DATA :: ", products.length);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <Topbar navigation={navigation} />

      <View style={styles.content}>
        {tab === "__home" && <HomeTab />}
        {tab === "__other" && <HomeTab />}
      </View>

      <Navbar setTab={setTab} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

    borderColor: "red",
    borderWidth: 1
  },
  content: {
    flex: 1,

    borderColor: "blue",
    borderWidth: 1
  }
});

export default Dashboard;
