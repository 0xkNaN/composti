import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";

import CategoryIcon from "../../assets/dashboard/category.svg";

const EmptyShop = () => {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyInner}>
        <View style={styles.emptyIcon}>
          <CategoryIcon />
        </View>
        <View style={styles.emptyContent}>
          <Text style={styles.emptyTitle}>No products added...yet!</Text>
          <Text style={styles.emptyDesc}>Start adding your products. Lorem ipsum dolor sit amet. Eos adipisci eius aut quis.</Text>
        </View>
      </View>
    </View>
  );
};

const ProductCard = () => {
  return (
    <View style={styles.card}>
      <Surface elevation={0} style={styles.cardInner}>
        <View style={styles.cardLogo}>
          <CategoryIcon />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Product Demo</Text>
          <Text style={styles.cardDesc}>Product details</Text>
        </View>
      </Surface>
    </View>
  );
};

const ShopTab = () => {
  const [data, setData] = useState({ loading: true, products: [] });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Greenshop</Text>

      {data.products.length === 0 && <EmptyShop />}

      {data.products.length > 0 && (
        <View style={styles.list}>
          {data.products.map((t, idx) => (
            <ProductCard key={idx} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20

    // borderColor: "red",
    // borderWidth: 1
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 40
  },
  // ...
  list: {},
  card: {
    borderStyle: "solid",
    borderWidth: 1,
    // borderColor: "#001927",
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
    // borderColor: "#001927",
    // borderRightWidth: 1,
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
    paddingHorizontal: 20
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

export default ShopTab;
