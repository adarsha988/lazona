import { useState } from "react"
import { useCallback } from "react";
import API from "../utils/api";
import { URLS } from "../constants";

 export const useOrders= ()=>{
    const[loading,setLoading]=useState(false);
    const[data,setData]=useState("");
    const[error,setError]=useState(null);
    const[msg,setMsg]=useState("");

const list=useCallback(async()=>{
    try{
        setLoading(true)
        const {data}= await API.get(`${URLS.ORDERS}`)
        setData(data.data.data)
    
    } catch(e){
        const errMsg=e?.response.data.msg||"Something went wrong!!"
        setError(errMsg)
    }finally{
     setLoading(false)
    }},[])
const getById=useCallback(async(id)=>{
    try{
        setLoading(true)
        const {data}= await API.get(`${URLS.ORDERS}/${id}`)
        setData(data.data.data)
        setMsg("Order fetched Successfully!!");
        return data.data
    } catch(e){
        const errMsg=e?.response.data.msg||"Something went wrong!!"
        setError(errMsg)
    }finally{
     setLoading(false)
    }

},[])
const updateById=async(id,payload)=>{
    try{
        setLoading(true)
        const {data}= await API.put(`${URLS.ORDERS}/${id}`,payload)
        setData(data.data)
        
        setMsg("Order updated Successfully!!");
        return data
    } catch(e){
        const errMsg=e?.response.data.msg||"Something went wrong!!"
        setError(errMsg)
    }finally{
        setLoading(false)
    }
    
}

const remove=async(id)=>{
    try{
        setLoading(true)
        const result= await API.delete(`${URLS.ORDERS}/${id}`)
        return result
    } catch(e){
        const errMsg=e?.response.data.msg||"Something went wrong!!"
        setError(errMsg)
    }finally{
     setLoading(false)
    }

}


return{list,getById,updateById,remove,data,msg,error,loading}
}