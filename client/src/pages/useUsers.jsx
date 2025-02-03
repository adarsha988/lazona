import { useState,useCallback } from "react";
import API from "../utils/api"
import { SERVER_URL, URLS } from "../constants";


 export const useUsers = ()=>{
 const[data,setData]=useState("");
 const[error,setError]=useState(null);
 const[loading,setLoading]=useState(false);

    const list = async()=>{
        setLoading(true)
     try{
        const {data}= await API.get()
     } catch(e)
     {
       const errMsg=e?.response.data.msg||"API request failed!!!"
         }finally{
           setLoading(fasle);
     }

    }
}