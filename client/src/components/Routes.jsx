import { Navigate } from "react-router-dom"
import { getToken } from "../utils/session";
import { jwtDecode } from "jwt-decode"

export const AdminRoutes = ({ children, roles }) => {
  return (
    <>
      {isLoggedIn() && isAdmin(roles) ? (
        children
      ) : isLoggedIn() && !isAdmin(roles) ? (
        <Navigate replace to={"/admin/dashboard"} />
      ) : (
        <Navigate replace to={"/login"} />
      )}
    </>
  );
};

export const PrivateRoutes = ({ children }) => {
  
  return (
    <>
      {isLoggedIn() ? <Navigate replace to={"/admin/dashboard"} /> : children}
    </>
  );
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
  const now = Date.now();
  return now < exp * 1000;

}