import axios from "react-native-axios";

var HTTP = axios.create({
  // baseURL: "http://localhost:3000/",
  baseURL: "https://dummyjson.com/",
  timeout: 5000,
  headers: {}
});

export const GET_DATA = async () => {
  try {
    const res = await HTTP.get("/products");
    const products = res?.data?.products || [];
    // console.log("#DATA :: ", products);
    return [...products];
  } catch (err) {
    // console.log("#Error :: ", err);
    return { error: true };
  }
};

export const POST_DATA = async (req) => {
  await HTTP.post("/products", req);
  return await GET_DATA();
};

export const DEL_DATA = async (id) => {
  await HTTP.delete("/products", { id });
  return await GET_DATA();
};
