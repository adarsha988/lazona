import { URLS } from "../constants";
import API from "../utils/api";

export const create = async(payload)=>{

    return await API.post(URLS.ORDERS,payload)
}
