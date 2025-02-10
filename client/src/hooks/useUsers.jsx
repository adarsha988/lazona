import { useState,useCallback } from "react";
import API from "../utils/api"
import {  URLS } from "../constants";


 export const useUsers= ()=>{
 const[data,setData]=useState("");
 const[error,setError]=useState(null);
 const[msg,setMsg]=useState("");
 const[loading,setLoading]=useState(false);

    const list = useCallback(async({limit,currentPage})=>{
        setLoading(true);
     try{
    const {data}= await API.get(`${URLS.USERS}?size=${limit}&page=${currentPage}`)
        setData(data?.data?.data)
        return data
     } catch(e)
     {
       const errMsg =e?.response.data.msg||"API request failed!!!";
       setError(errMsg);
         }finally{
           setLoading(false);
     }
  },[])

  const remove= async(id,payload)=>{
    setLoading(true);
    try{
      const data = await API.delete(`${URLS.USERS}/${id}`,{data:payload});
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
    try{
      const{ data }= await API.post(URLS.USERS,payload)
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
      const data= await API.get(`${URLS.USERS}/${id}`);
    setData(data?.data.data)
    return data?.data.data;
    } catch(e){
      const errMsg = e.response.data.msg||'something went wrong';
      setError(errMsg)
    } finally{
      setLoading(false)
    }
  },[])
  const updateById = async(payload)=>{
  try{
  setLoading(true)
  const{ data}= await API.put(`${URLS.USERS}/profile`,payload)
  setData(data?.data)
 return data;
  }catch(e){
  const errMsg=e?.response?.data.msg||"Something went wrong";
  setError(errMsg)
  } finally{
  setLoading(false);

  }

  }
  const blockUser=async(id,payload)=>{
    try{
      
        setLoading(true)
        const data= await API.patch(`${URLS.USERS}/status/${id}`,payload)
        return data
    } catch(e){
        const errMsg=e?.response.data.msg||"Something went wrong!!"
        setError(errMsg)
    }finally{
        setLoading(false)
    }
    
}


  return {blockUser,list,remove,create,getById,updateById,error,msg,data}
}