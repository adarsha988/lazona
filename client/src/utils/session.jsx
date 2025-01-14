export const setToken=(token)=>{
    const saveToken=localStorage.setItem("access_token",token);
    if (!saveToken) return null;
  return true;
}
export const getToken=()=>{
    const token=localStorage.getItem("access_token");
    if (!token) return null;
  return true;
}
