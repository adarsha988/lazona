import API from "../utils/api";
import {URLS} from "../constants";

const list = async ({limit,page}) => {
  
  return API.get(`${URLS.PRODUCTS}?limit=${limit}&page=${page}`)
};
const create= async (payload) => {
  return  API.post(`${URLS.PRODUCTS}`,payload,
   { headers: {
       'Content-Type': 'multipart/form-data',
       }}
  )
};
const getById = async (id) => {
  return API.get(`${URLS.PRODUCTS}/${id}`)
};

export{list,getById,create};