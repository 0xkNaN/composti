import axios from "react-native-axios";

var HTTP = axios.create({
  // baseURL: "http://localhost:3000/",
  baseURL: "https://dummyjson.com/",
  timeout: 5000,
  headers: {}
});

export const GET_DATA = async () => {
  const data = await HTTP.get("/products");
  return [...data];
};

export const POST_DATA = async (req) => {
  await HTTP.post("/products", req);
  const data = await GET_DATA();
  return [...data];
};

export const DEL_DATA = async (id) => {
  await HTTP.delete("/products", { id });
  const data = await GET_DATA();
  return [...data];
};
