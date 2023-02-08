import { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Modal } from "react-native";
import { TouchableRipple, Surface, Text, TextInput, List } from "react-native-paper";

import CategoryIcon from "../../assets/dashboard/category.svg";

import { GET_TRANSACTIONS, PUT_TRANSACTIONS } from "../../services/http";

const ModalAnnounce = ({ modalVisible, modalEdit, setModalVisible, onSaveHandler }) => {
  const [data, setData] = useState({ img: false, name: "", type: "", disponibility: "", weight: "", isAccepted: false, isPending: true });

  useEffect(() => {
    if (!modalVisible) return;

    setData((d) => ({ ...d, ...modalEdit }));
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
          <Text style={styles.modalHeaderTitle}>Announce details</Text>
          <TouchableRipple
            onPress={() => {
              setModalVisible(false);
            }}>
            <Text style={styles.modalHeaderClose}>X</Text>
          </TouchableRipple>
        </View>
        <View style={styles.modalContent}>
          <View style={styles.modalPreview}>
            <List.Image
              variant="image"
              source={require("../../assets/dashboard/transaction.jpeg")}
              style={{
                resizeMode: "cover",
                height: 150,
                width: 120
              }}
            />
          </View>

          <TextInput
            style={styles.modalContentInput}
            mode="outlined"
            label="Type"
            value={data.type}
            onChangeText={(type) => setData((d) => ({ ...d, type }))}
          />

          <TextInput
            style={styles.modalContentInput}
            mode="outlined"
            label="Volume"
            value={data.volume}
            onChangeText={(volume) => setData((d) => ({ ...d, volume }))}
          />

          <TouchableRipple
            style={styles.buttonDanger}
            onPress={() => {
              onSaveHandler(modalEdit.id, { isPending: false, isAccepted: false });
              setData({ img: false, name: "", type: "", disponibility: "", weight: "", isAccepted: false, isPending: true });
            }}>
            <Text style={styles.buttonLabel}>Refuse</Text>
          </TouchableRipple>

          <TouchableRipple
            style={styles.button}
            onPress={() => {
              onSaveHandler(modalEdit.id, { isPending: false, isAccepted: true });
              setData({ img: false, name: "", type: "", disponibility: "", weight: "", isAccepted: false, isPending: true });
            }}>
            <Text style={styles.buttonLabel}>Validate</Text>
          </TouchableRipple>
        </View>
      </View>
    </Modal>
  );
};

const EmptyTrans = () => {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyInner}>
        <View style={styles.emptyIcon}>
          <CategoryIcon />
        </View>
        <View style={styles.emptyContent}>
          <Text style={styles.emptyTitle}>No Organic waste pending...yet!</Text>
          <Text style={styles.emptyDesc}>
            Start collecting and sorting your organic waste now. Once it's ready just announce it to composters close to you.
          </Text>
        </View>
      </View>
    </View>
  );
};

const TransCard = ({ data, onEditHandler }) => {
  return (
    <TouchableRipple
      style={styles.card}
      onPress={() => {
        onEditHandler();
      }}>
      <Surface elevation={0} style={styles.cardInner}>
        <View style={styles.cardLogo}>
          <List.Image
            variant="image"
            source={require("../../assets/dashboard/transaction.jpeg")}
            style={{
              resizeMode: "cover",
              height: "100%",
              width: "100%"
            }}
          />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{data.name}</Text>
          <Text style={styles.cardDesc}>1234 NW Bobcat Lane</Text>
        </View>
      </Surface>
    </TouchableRipple>
  );
};

const TransTab = () => {
  const [data, setData] = useState({ loading: true, collections: [] });
  const [modalVisible, setModalVisible] = useState({ open: false, edit: {} });

  const getData = async () => {
    const collections = await GET_TRANSACTIONS();
    setData({ loading: false, collections });
  };

  const onSaveHandler = async (id, data) => {
    await PUT_TRANSACTIONS(id, data);
    setModalVisible({ open: false, edit: {} });
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  const collectionsList = data.collections.filter((c) => !!c.isPending);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending collections</Text>

      {collectionsList.length === 0 && <EmptyTrans />}

      {collectionsList.length > 0 && (
        <ScrollView style={styles.list}>
          {collectionsList.map((data, idx) => (
            <TransCard
              key={idx}
              data={data}
              onEditHandler={() => {
                setModalVisible({ open: true, edit: { ...data } });
              }}
            />
          ))}
        </ScrollView>
      )}

      <ModalAnnounce
        modalVisible={modalVisible.open}
        modalEdit={modalVisible.edit}
        setModalVisible={() => {
          setModalVisible({ open: false, edit: {} });
        }}
        onSaveHandler={onSaveHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    paddingHorizontal: 30,
    marginTop: 30,
    marginBottom: 40
  },
  // ...
  list: {
    paddingHorizontal: 20
  },
  card: {
    borderStyle: "solid",
    borderWidth: 1,
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
  cardContent: {
    width: "75%",
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  cardTitle: {
    color: "#001927",
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "700",
    marginBottom: 5
  },
  cardDesc: {
    color: "#75828A",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600"
  },
  // ...
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40
  },
  emptyInner: {
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1
  },
  emptyIcon: {
    marginBottom: 30
  },
  emptyContent: {
    textAlign: "center"
  },
  emptyTitle: {
    textAlign: "center",
    marginBottom: 20
  },
  emptyDesc: {
    textAlign: "center"
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
  buttonDanger: {
    height: 55,
    backgroundColor: "red",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
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

export default TransTab;
