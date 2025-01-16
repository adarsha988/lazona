import { Navigate } from "react-router-dom"
import { getToken } from "../utils/session";
import { jwtDecode } from "jwt-decode"

export const PrivateRoutes=({children})=>{
  return <>
  {
    isLoggedIn() ? <Navigate to={"/admin/dashboard"}/>:children
  }
  </>
};

export const AdminRoutes=({children,roles})=>{
  return <>
  {
    isAdmin(roles)&&  isLoggedIn()  ? children:<Navigate to={"/login"}/>
  }
  </>
};
const isAdmin=(roles)=>{
  const token = getToken();
  if (!token) return false;
  //check for access_token duration
  const{data}= jwtDecode(token)
const role= data.roles.includes(roles)
    return role;
}

const isLoggedIn=()=>{
  const token = getToken();
  if (!token) return false;

  const {exp}= jwtDecode(token);
  const now = new Date().valueOf();
  const isvalid= new Date(now).getTime()> new Date(exp).getTime()
  return isvalid;
}