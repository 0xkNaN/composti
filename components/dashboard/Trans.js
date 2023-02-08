import { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Surface, Text, List } from "react-native-paper";

import CategoryIcon from "../../assets/dashboard/category.svg";

import { GET_TRANSACTIONS } from "../../services/http";

const EmptyTrans = () => {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyInner}>
        <View style={styles.emptyIcon}>
          <CategoryIcon />
        </View>
        <View style={styles.emptyContent}>
          <Text style={styles.emptyTitle}>No Organic waste collected...yet!</Text>
          <Text style={styles.emptyDesc}>
            Start collecting and sorting your organic waste now. Once it's ready just announce it to composters close to you.
          </Text>
        </View>
      </View>
    </View>
  );
};

const TransCard = ({ data }) => {
  return (
    <View style={styles.card}>
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
          <Text style={styles.cardTitle}>
            {data.name}
            <Text style={styles.cardTitleStatus}>
              {data.isPending && " (Pending)"}
              {!data.isPending && !data.isAccepted && " (Refused)"}
              {!data.isPending && data.isAccepted && " (Accepted)"}
            </Text>
          </Text>
          {data.weight && <Text style={styles.cardDesc}>{`Weight: ${data.weight} KG`}</Text>}
          {!data.weight && <Text style={styles.cardDesc}>Weight: N/A</Text>}
        </View>
      </Surface>
    </View>
  );
};

const TransTab = ({ account }) => {
  const [data, setData] = useState({ loading: true, collections: [] });

  const isGreener = account?.type === "__greener";

  const getData = async () => {
    const collections = await GET_TRANSACTIONS();
    setData({ loading: false, collections });
  };

  useEffect(() => {
    getData();
  }, []);

  const collectionsList = data.collections.filter((c) => isGreener || (!isGreener && !c.isPending));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique de collections</Text>

      {collectionsList.length === 0 && <EmptyTrans />}

      {collectionsList.length > 0 && (
        <ScrollView style={styles.list}>
          {data.collections.map((data, idx) => (
            <TransCard key={idx} data={data} />
          ))}
        </ScrollView>
      )}
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
  cardTitleStatus: {
    color: "#001927",
    fontSize: 14,
    lineHeight: 30,
    fontWeight: "700"
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
  }
});

export default TransTab;
