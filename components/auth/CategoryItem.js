import { useEffect, useState } from "react";

import { StyleSheet, View, ActivityIndicator } from "react-native";
import { TouchableRipple, Surface, Text } from "react-native-paper";

const CategoryItem = ({ data, isSelected, hander }) => {
  return (
    <TouchableRipple
      style={{ ...styles.category, ...(isSelected ? styles.categoryActive : {}), marginBottom: 10 }}
      onPress={() => hander(data.id)}
      rippleColor="rgba(42, 223, 128, 0.07)">
      <Surface elevation={0} style={styles.categoryInner}>
        <View style={styles.categoryContent}>
          <Text style={styles.categoryTitle}>{data.title}</Text>
          <Text style={styles.categoryDesc}>Lorem ipsum dolor sit amet.{"\n"} Non quas tenetur non soluta nobis.</Text>
        </View>
      </Surface>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  category: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#001927",
    borderRadius: 4
  },
  categoryActive: {
    borderColor: "#2adf80"
  },
  categoryInner: {
    flexDirection: "row"
  },
  categoryContent: {
    width: "75%",
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  categoryTitle: {
    color: "#001927",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    marginBottom: 5
  },
  categoryDesc: {
    color: "#75828A",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "400"
  }
});

export default CategoryItem;
