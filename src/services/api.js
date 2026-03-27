import axios from "axios";

const API = axios.create({
  baseURL: "https://shudarshini.pythonanywhere.com/api/",
});

export const getCategoriesAPI = () => API.get("categories/");
export const getProductsAPI = () => API.get("products/");
export const getNewArrivalsAPI = () => API.get("products/new/");
export const getTopSellingAPI = () => API.get("products/top/");

export default API;