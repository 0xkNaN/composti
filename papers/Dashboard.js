import { useEffect, useState } from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Platform, StatusBar, View, Modal } from "react-native";
import { TouchableRipple, Text, Surface, List } from "react-native-paper";

import { getAccountData } from "../services/storage";
import { GET_NOTIFICATIONS } from "../services/http";

import Topbar from "../components/common/Topbar";
import Navbar from "../components/common/Navbar";

import HomeTab from "../components/dashboard/Home";
import ShopTab from "../components/dashboard/Shop";
import TransTab from "../components/dashboard/Trans";
import TriTab from "../components/dashboard/Tri";

import LogoIcon from "../assets/logo.svg";

const NotifCard = ({ data }) => {
  return (
    <View style={styles.card}>
      <Surface elevation={0} style={styles.cardInner}>
        <View style={styles.cardLogo}>
          <LogoIcon style={styles.cardLogoIcon} />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Greener added a new annonce</Text>
        </View>
      </Surface>
    </View>
  );
};

const ModalNotification = ({ account, modalVisible, setModalVisible }) => {
  const isGreener = account.type === "__greener";
  const [data, setData] = useState({ loading: false, notifications: [] });

  const getData = async () => {
    const notifications = await GET_NOTIFICATIONS();
    setData({ loading: false, notifications });
  };

  useEffect(() => {
    if (!modalVisible || isGreener) return;
    getData();
  }, [modalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderTitle}>Notifications</Text>
          <TouchableRipple
            onPress={() => {
              setModalVisible(false);
            }}>
            <Text style={styles.modalHeaderClose}>X</Text>
          </TouchableRipple>
        </View>
        <View style={styles.modalContent}>
          {data.notifications.map((data, idx) => (
            <NotifCard key={idx} data={data} />
          ))}
        </View>
      </View>
    </Modal>
  );
};

const Dashboard = ({ navigation }) => {
  const [tab, setTab] = useState("__home");
  const [account, setAccount] = useState({});

  const [notifModal, setNotifModal] = useState(false);

  const getData = async () => {
    const account = await getAccountData();
    setAccount(account || {});
  };

  useEffect(() => {
    getData();
  }, []);

  const sProps = { account };

  return (
    <SafeAreaProvider style={styles.container}>
      <Topbar account={account} navigation={navigation} onOpenNotification={() => setNotifModal(true)} />

      <View style={styles.content}>
        {tab === "__home" && <HomeTab {...sProps} />}
        {tab === "__shop" && <ShopTab {...sProps} />}
        {tab === "__trans" && <TransTab {...sProps} />}
        {tab === "__tri" && <TriTab {...sProps} />}
      </View>

      <Navbar tab={tab} setTab={setTab} />

      <ModalNotification account={account} modalVisible={notifModal} setModalVisible={setNotifModal} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  content: {
    flex: 1
  },
  // ...
  modal: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff"
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 30
  },
  modalHeaderTitle: {
    fontSize: 20,
    fontWeight: "700"
  },
  modalHeaderClose: {
    fontSize: 20,
    fontWeight: "400"
  },
  modalContent: {
    paddingHorizontal: 20
  },
  // ...
  card: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    marginBottom: 20
  },
  cardInner: {
    flexDirection: "row"
  },
  cardLogo: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center"
  },
  cardLogoIcon: {
    transform: [{ scale: 0.7 }]
  },
  cardContent: {
    width: "75%",
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  cardTitle: {
    color: "#001927",
    fontSize: 16,
    lineHeight: 25,
    fontWeight: "700",
    marginBottom: 5
  }
});

export default Dashboard;
