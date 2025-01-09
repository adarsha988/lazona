import API from "../utils/api";
import {URLS} from "../constants";

const list = async ({limit,page}) => {
  
  return API.get(`${URLS.PRODUCTS}?limit=${limit}&page=${page}`)
};

export{list};