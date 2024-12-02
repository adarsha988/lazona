import { Navigate } from "react-router-dom"

export const PrivateRoutes=({children,roles})=>{
  return <>
  {
    isAdmin(roles) ? children:<Navigate to={"/login"}/>
  }
  </>
};
const isAdmin=(roles)=>{
    return true;
}
