import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeAccountData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@account__", jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getAccountData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@account__");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
