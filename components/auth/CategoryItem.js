import { StyleSheet, View } from "react-native";
import { TouchableRipple, Surface, Text } from "react-native-paper";

import CategoryIcon from "../../assets/signup/category.svg";
import CategorySIcon from "../../assets/signup/categoryS.svg";

const CategoryItem = ({ data, isSelected, hander }) => {
  return (
    <TouchableRipple
      style={{ ...styles.category, ...(isSelected ? styles.categoryActive : {}), marginBottom: 10 }}
      onPress={() => hander(data.id)}
      rippleColor="rgba(42, 223, 128, 0.07)">
      <Surface elevation={0} style={styles.categoryInner}>
        <View style={styles.categoryContent}>
          <Text style={styles.categoryTitle}>{data.title}</Text>
          <View style={styles.categorySubs}>
            {[1, 2, 3, 4, 5, 6].map((x, idx) => {
              if (isSelected) return <CategorySIcon key={idx} style={styles.categorySubsIcon} />;
              return <CategoryIcon key={idx} style={styles.categorySubsIcon} />;
            })}
          </View>
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
    marginBottom: 10
  },
  categorySubs: {
    flexDirection: "row"
  },
  categorySubsIcon: {
    marginRight: 10
  }
});

export default CategoryItem;
