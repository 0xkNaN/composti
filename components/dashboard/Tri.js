import { useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";

import { Button, StyleSheet, View, Text } from "react-native";

import CategoryIcon from "../../assets/dashboard/category.svg";
import ScanIcon2 from "../../assets/dashboard/_scan.svg";

const TriTab = () => {
  const [done, setDone] = useState(false);

  const requestPerms = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    // setCameraPermission(cameraPermission.status === "granted");

    if (cameraPermission.status === "granted") {
      console.log("#Granted");
      setTimeout(() => {
        setDone(true);
      }, 3000);
    }
  };

  const toggleCameraType = () => {};

  useEffect(() => {
    requestPerms();
  }, []);

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={CameraType.back}>
        <View style={styles.cameraIcon}>
          <ScanIcon2 />
        </View>

        {done && (
          <View style={styles.cameraType}>
            <View style={styles.cameraTypeInner}>
              <View style={styles.cameraTypeInnerIcon}>
                <CategoryIcon />
              </View>
              <View style={styles.cameraTypeInnerText}>
                <Text>Object name</Text>
                <Text>Category name</Text>
              </View>
            </View>
          </View>
        )}
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#ffffff"

    // borderColor: "red",
    // borderWidth: 1
  },
  camera: {
    flex: 1,
    position: "relative"
  },
  cameraIcon: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",

    justifyContent: "center",
    alignItems: "center"
  },
  cameraType: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    paddingBottom: 20,

    justifyContent: "flex-end",
    alignItems: "center"
  },
  cameraTypeInner: {
    alignItems: "center",
    flexDirection: "row",
    height: 70,
    width: 200,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#ffffff"
  },
  cameraTypeInnerIcon: {},
  cameraTypeInnerText: {
    paddingHorizontal: 15
  }
});

export default TriTab;
