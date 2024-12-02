import API from "../utils/api";

const list = async () => {
  return await API.get("/products")
};

export{list};