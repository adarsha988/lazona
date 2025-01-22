import { URLS } from "../constants";
import API from "../utils/api";

export const login = async(payload)=>{
 return  API.post(URLS.Auth+"/login",payload)
}