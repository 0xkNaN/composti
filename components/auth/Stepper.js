import { StyleSheet, View } from "react-native";
import { TouchableRipple, Surface, Text } from "react-native-paper";

import BackIcon from "../../assets/back.svg";

const AuthStepper = ({ title = "", step, setStep }) => {
  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <TouchableRipple style={styles.backIcon} onPress={() => setStep(step - 1)} rippleColor="rgba(42, 223, 128, 0.01)">
          <BackIcon />
        </TouchableRipple>
      </View>

      <View style={styles.stepper}>
        <View style={styles.stepperInner}>
          <View
            style={{ ...styles.stepperItem, ...(step >= 1 ? styles.stepperItemActive : {}), borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          />
          <View style={{ ...styles.stepperItem, ...styles.stepperItemCenter, ...(step >= 2 ? styles.stepperItemActive : {}) }} />
          <View
            style={{ ...styles.stepperItem, ...(step >= 3 ? styles.stepperItemActive : {}), borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          />
        </View>
      </View>

      <View style={styles.stepperLabel}>
        <Text style={styles.stepperLabelText}>Step {step} OF 3</Text>
      </View>

      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40
  },
  back: {
    height: 50,
    justifyContent: "center",
    padding: 14,
    marginBottom: 30
  },
  backIcon: {
    width: 40,
    height: 40,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderRadius: 20,
    overflow: "hidden"
  },
  // ...
  stepper: {
    height: 5,
    paddingHorizontal: 24,
    justifyContent: "center"
  },
  stepperInner: {
    height: 5,
    flexDirection: "row",
    backgroundColor: "#d9e4e5",
    borderRadius: 4,
    justifyContent: "center"
  },
  stepperItem: {
    flex: 1,
    height: 5,
    borderRadius: 4
  },
  stepperItemActive: {
    backgroundColor: "#2adf80"
  },
  stepperItemCenter: {
    marginHorizontal: 1,
    borderRadius: 0
  },
  stepperLabel: {
    paddingHorizontal: 24,
    marginVertical: 20
  },
  stepperLabelText: {
    color: "#75828A",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "400"
  },
  title: {
    height: 100,
    paddingHorizontal: 24,
    marginBottom: 30,

    // TODO: remove this
    // borderWidth: 1,
    // borderColor: "green"
  },
  titleText: {
    color: "#001927",
    fontSize: 22,
    lineHeight: 27,
    fontWeight: "700"
  }
});

export default AuthStepper;
