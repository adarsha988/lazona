import API from "../utils/api";

const list = async () => {
  return await API.get("https://fakestoreapi.com/products")
};

export{list};