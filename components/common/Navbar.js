import { StyleSheet, View } from "react-native";
import { TouchableRipple, Surface, Text } from "react-native-paper";

import HomeIcon from "../../assets/navbar/home.svg";
import HomeSIcon from "../../assets/navbar/homeS.svg";
import ShopIcon from "../../assets/navbar/shop.svg";
import ShopSIcon from "../../assets/navbar/shopS.svg";
import TransIcon from "../../assets/navbar/trans.svg";
import TransSIcon from "../../assets/navbar/transS.svg";
import TriIcon from "../../assets/navbar/tri.svg";
import TriSIcon from "../../assets/navbar/triS.svg";

let tabs = [
  { id: "__home", label: "Collector", Icon: HomeIcon, SIcon: HomeSIcon },
  { id: "__shop", label: "Greenshop", Icon: ShopIcon, SIcon: ShopSIcon },
  { id: "__trans", label: "Collections", Icon: TransIcon, SIcon: TransSIcon },
  { id: "__tri", label: "Auto tri", Icon: TriIcon, SIcon: TriSIcon }
];

const Navbar = ({ tab, setTab }) => {
  const tabsList = tabs.map((t) => ({ ...t, selected: t.id === tab }));

  return (
    <View style={styles.container}>
      {tabsList.map((icon, idx) => (
        <TouchableRipple
          key={idx}
          onPress={() => {
            setTab(icon.id);
          }}>
          <View style={styles.tab}>
            <View style={styles.tabIcon}>
              {!icon.selected && <icon.Icon />}
              {icon.selected && <icon.SIcon />}
            </View>

            <Text style={{ ...styles.tabLabel, ...(icon.selected ? styles.tabLabelS : {}) }}>{icon.label}</Text>
          </View>
        </TouchableRipple>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 90,
    paddingHorizontal: 11,
    backgroundColor: "#ffffff",
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    borderTopWidth: 1
  },
  tab: {
    alignItems: "center"
  },
  tabIcon: {
    marginBottom: 5
  },
  tabLabel: {
    color: "#363636",
    fontSize: 13,
    fontWeight: "600"
  },
  tabLabelS: {
    color: "green"
  }
});

export default Navbar;
