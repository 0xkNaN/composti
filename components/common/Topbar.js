import { StyleSheet, View } from "react-native";
import { TouchableRipple, Surface, Text } from "react-native-paper";

import NotifIcon from "../../assets/dashboard/notification.svg";

const Topbar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableRipple
        onPress={() => {
          navigation.replace("Dashboard", {});
        }}>
        <View style={styles.avatar}>
          <Text style={styles.avatarLabel}>CT</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple
        onPress={() => {
          navigation.replace("Dashboard", {});
        }}>
        <View style={styles.notif}>
          <NotifIcon />
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 90,
    paddingHorizontal: 30,
    backgroundColor: "#ffffff"

    // borderColor: "red",
    // borderWidth: 1
  },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fcdbb7"
  },
  avatarLabel: {},
  notif: {}
});

export default Topbar;
