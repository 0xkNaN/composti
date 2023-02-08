import axios from "react-native-axios";

var HTTP = axios.create({
  baseURL: "http://192.168.10.68:3000/",
  timeout: 5000,
  headers: {}
});

export const GET_TRANSACTIONS = async () => {
  try {
    const res = await HTTP.get("/transactions");
    const transactions = res?.data?.transactions || [];
    return [...transactions.reverse()];
  } catch (err) {}
};

export const POST_TRANSACTIONS = async (req) => {
  try {
    await HTTP.post("/transactions", req);
    return await GET_TRANSACTIONS();
  } catch (err) {}
};

export const PUT_TRANSACTIONS = async (id, data) => {
  try {
    return await HTTP.put("/transactions", { id, data });
  } catch (err) {}
};

export const GET_NOTIFICATIONS = async () => {
  try {
    const res = await HTTP.get("/transactions/notifications");
    const notifications = res?.data?.notifications || [];
    return [...notifications.reverse()];
  } catch (err) {}
};
