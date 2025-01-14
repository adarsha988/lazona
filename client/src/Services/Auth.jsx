import { URLS } from "../constants";
import API from "../utils/api";

export const login = async(payload)=>{
    const s=URLS.Auth+"/login"
 return await API.post(URLS.Auth+"/login",payload)
}