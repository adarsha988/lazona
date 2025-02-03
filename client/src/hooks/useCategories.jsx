import { useState,useCallback } from "react";
import API from "../utils/api"
import {  URLS } from "../constants";


 export const useCategories= ()=>{
 const[data,setData]=useState("");
 const[error,setError]=useState(null);
 const[msg,setMsg]=useState("");
 const[loading,setLoading]=useState(false);

    const list = useCallback(async()=>{
        setLoading(true);
     try{
        const {data}= await API.get(URLS.Categories)
        setData(data.data.data)
     } catch(e)
     {
       const errMsg =e?.response.data.msg||"API request failed!!!";
       setError(errMsg);
         }finally{
           setLoading(false);
     }
  },[])

  const remove= async(id)=>{
    setLoading(true);
    console.log(`${URLS.Categories}/${id}`)
    try{
      const data = await API.delete(`${URLS.Categories}/${id}`);
      return data
    } catch(e){
      const errMsg=e.response ? e.response.data.msg:"Something went wrong"
      setError(errMsg);
      throw errMsg
   }finally{
      setLoading(false);

    }

  }
  const create= async(payload)=>{
    setLoading(true);
    console.log(payload)
    try{
      const{ data }= await API.post(URLS.Categories,{name:payload});
      setMsg(data.msg)
      setData(data.data) 
      return data
    
    } catch(e){
      const errMsg=e.response ? e.response.data.msg:"Something went wrong"
      setError(errMsg);
      throw errMsg
   }finally{
      setLoading(false);

    }

  }
  const getById=useCallback(async(id)=>{
    try {
      setLoading(true)
      const data= await API.get(`${URLS.Categories}/${id}`);
    setData(data?.data.data)
    return data;
    } catch(e){
      const errMsg = e.response.data.msg||'something went wrong';
      setError(errMsg)
    } finally{
      setLoading(false)
    }
  },[])
  const updateById = async(payload,id)=>{
  try{
  setLoading(true)
  const data= await API.put(`${URLS.Categories}/${id}`,{name:payload})
 return data.data;
  }catch(e){
  const errMsg=e?.response?.data.msg||"Something went wrong";
  setError(errMsg)
  } finally{
  setLoading(false);

  }

  }


  return {list,remove,create,getById,updateById,error,msg,data}
}