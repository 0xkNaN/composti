import { StyleSheet, View } from "react-native";
import { TouchableRipple, Surface, Text } from "react-native-paper";

import NotifIcon from "../../assets/dashboard/notification.svg";

const Topbar = ({ account, navigation, onOpenNotification }) => {
  const isGreener = account?.type === "__greener";

  return (
    <View style={styles.container}>
      <TouchableRipple
        onPress={() => {
          navigation.replace("Signup", {});
        }}>
        <View style={styles.avatar}>
          <Text style={styles.avatarLabel}>{isGreener ? "G" : "C"}</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple
        onPress={() => {
          onOpenNotification();
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
    height: 70,
    paddingHorizontal: 30,
    backgroundColor: "#ffffff"
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
