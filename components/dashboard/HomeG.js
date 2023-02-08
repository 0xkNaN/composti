import { useState } from "react";

import { StyleSheet, View, Modal } from "react-native";
import { TouchableRipple, Text, TextInput, List } from "react-native-paper";

import LogoIcon from "../../assets/logo.svg";
import HomeShape from "../../assets/dashboard/stats.svg";
import CamIcon from "../../assets/dashboard/camera.svg";

import { POST_TRANSACTIONS } from "../../services/http";

const ModalAnnounce = ({ modalVisible, setModalVisible, onSaveHandler }) => {
  const [data, setData] = useState({ img: false, name: "", type: "", disponibility: "", weight: "", isAccepted: false, isPending: true });

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
          <Text style={styles.modalHeaderTitle}>Announce details</Text>
          <TouchableRipple
            onPress={() => {
              setModalVisible(false);
            }}>
            <Text style={styles.modalHeaderClose}>X</Text>
          </TouchableRipple>
        </View>
        <View style={styles.modalContent}>
          <TouchableRipple style={styles.modalPreview} onPress={() => setData((d) => ({ ...d, img: true }))}>
            <View>
              {!data.img && <CamIcon />}
              {!!data.img && (
                <List.Image
                  variant="image"
                  source={require("../../assets/dashboard/transaction.jpeg")}
                  style={{
                    resizeMode: "cover",
                    height: 150,
                    width: 120
                  }}
                />
              )}
            </View>
          </TouchableRipple>

          <TextInput
            style={styles.modalContentInput}
            mode="outlined"
            label="Name"
            value={data.name}
            onChangeText={(name) => setData((d) => ({ ...d, name }))}
          />
          <TextInput
            style={styles.modalContentInput}
            mode="outlined"
            label="Type de déshet"
            value={data.type}
            onChangeText={(type) => setData((d) => ({ ...d, type }))}
          />
          <TextInput
            style={styles.modalContentInput}
            mode="outlined"
            label="Disponibility"
            value={data.disponibility}
            onChangeText={(disponibility) => setData((d) => ({ ...d, disponibility }))}
          />

          <TouchableRipple
            style={styles.button}
            onPress={() => {
              onSaveHandler(data);
              setData({ img: false, name: "", type: "", disponibility: "", weight: "", isAccepted: false, isPending: true });
            }}>
            <Text style={styles.buttonLabel}>Annonce</Text>
          </TouchableRipple>
        </View>
      </View>
    </Modal>
  );
};

const HomeTab = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const onSaveHandler = async (data) => {
    await POST_TRANSACTIONS(data);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.shape}>
        <HomeShape />
        <View style={styles.shapeInner}>
          <View style={styles.shapeLogo}>
            <LogoIcon style={styles.shapeLogoIcon} />
          </View>
          <Text style={styles.shapeTxt1}>3 kg Waste Collected</Text>
          <Text style={styles.shapeTxt2}>0.00</Text>
          <Text style={styles.shapeTxt3}>gagné</Text>
          <Text style={styles.shapeTxt4}>équivaut a 0.00£</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.contentQ}>
          <Text style={styles.contentQText}>Dechets trié et pré?</Text>
        </View>

        <View style={styles.contentA}>
          <TouchableRipple
            style={styles.button}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={styles.buttonLabel}>Annoncer au composteur</Text>
          </TouchableRipple>
        </View>
      </View>

      <ModalAnnounce modalVisible={modalVisible} setModalVisible={setModalVisible} onSaveHandler={onSaveHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    paddingBottom: 20
  },
  // ...
  shape: {
    position: "relative",
    paddingHorizontal: 5
  },
  shapeInner: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  shapeLogo: {
    marginBottom: 40
  },
  shapeLogoIcon: {
    transform: [{ scale: 1.5 }]
  },
  shapeTxt1: {
    color: "#fcdcb6",
    fontSize: 14,
    fontWeight: "400"
  },
  shapeTxt2: {
    fontSize: 45,
    fontWeight: "700"
  },
  shapeTxt3: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10
  },
  shapeTxt4: {
    fontSize: 16,
    fontWeight: "400"
  },
  // ...
  content: {
    paddingHorizontal: 24
  },
  contentQText: {
    color: "#a9a9a9",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 15
  },
  // ...
  button: {
    height: 55,
    backgroundColor: "#2adf80",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonLabel: {
    color: "#001927",
    fontSize: 16,
    fontWeight: "700"
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
  modalPreview: {
    height: 150,
    width: 110,
    marginBottom: 40,
    borderRadius: 5,
    backgroundColor: "#E2E7EB",

    justifyContent: "center",
    alignItems: "center"
  },
  modalContentInput: {
    backgroundColor: "#ffffff",
    marginBottom: 20
  }
});

export default HomeTab;
