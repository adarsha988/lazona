import { useState } from "react";
import API from "../utils/api";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../slices/productSlice";

const useApi = ()=>{
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [msg,setMsg]=useState("");
    const [data,setData]=useState("");
    const dispatch= useDispatch();

    const deleteById =async(id,url)=>{
   try{
      setLoading(true);
    console.log(`${url}/${id}`)
      const {data}= await API.delete(`${url}/${id}`,{data:{isArchived:true}})
      if(data.msg==="Success"){
      dispatch( fetchProducts({}))
        setMsg("Data deleted successfuly")
      }

   }
   catch(e){
  const errMsg= e.message||"something went wrong";
  setError(errMsg);
   }finally{
    setLoading(false)
   }
        
    }
    const updateById =async(url,id,payload)=>{
   try{
      setLoading(true);
      const {data}= await API.put(`${url}/${id}`,payload,{
        headers:{ 
          "Content-Type":"multipart/form-data", 
          }
      })
      console.log(data)
      if(data.msg==="success"){
        setMsg("Data updated successfuly")
      }
      setData(data?.data)


   }
   catch(e){
  const errMsg= e.message||"something went wrong";
  setError(errMsg);
   }finally{
    setLoading(false)
   }
        
    }
    const getById = useCallback(async(url,id)=>{
   try{
      setLoading(true);
      const {data}= await API.get(`${url}/${id}`)
      console.log(data)
      if(data.msg==="success"){
        setMsg("Data updated successfuly")
      }
      setData(data?.data)
     return data.data;

   }
   catch(e){
  const errMsg= e.message||"something went wrong";
  setError(errMsg);
   }finally{
    setLoading(false)
   }
        
    },[])
    
    return {error,loading,deleteById,updateById,msg,data,getById}
}
export default useApi;