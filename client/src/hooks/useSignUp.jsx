import axios from "axios";
import {URLS }from "../constants/index"
import { useState } from "react";
import { SERVER_URL } from "../constants/index";


export const useSignUp=()=>{
const [Email,setEmail]= useState(null);
const [Error,setError]= useState(null);
const [loading,setLoading]=useState(false)
const [submitted, setSubmitted] = useState(false);




const register = async(formData)=>{
setLoading(true);
try {
    
const data=await axios.post(SERVER_URL+URLS.Auth+"/register",formData)
setEmail(formData.email)
if(data.data.msg==="success")  setSubmitted(true);
}
catch(e)
{
const msg=e ? e.msg:"create Api Failed";
setError(msg)
}finally{
    setLoading(false)
}

}


const verify = async ({ payload }) => {
    try {
      setLoading(true);
      const verify = await axios.post(SERVER_URL+URLS.Auth+"/verify", payload );
      return verify;
    } catch (e) {
      const msg = e ? e.message : "Create API Failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };


const regenerate = async({Email})=>{
setLoading(true);
console.log(Email)
try {
 const regenerate=await axios.post(SERVER_URL+URLS.Auth+"/regenerate",{email:Email})
return regenerate;
}
catch(e)
{
const msg=e ? e.msg:"create Api Failed";
setError(msg)
}finally{
    setLoading(false)
}

}
return{Error,loading,submitted,regenerate,register,verify,Email}

}