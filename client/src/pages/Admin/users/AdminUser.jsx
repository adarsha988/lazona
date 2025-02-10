import { MdDelete,MdEdit } from "react-icons/md"; 
import { ShieldCheck,UserX,UserCheck} from "lucide-react";
import { useCallback, useEffect, useState } from 'react';
import Swal from "sweetalert2";
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from 'react-router-dom';
import { useUsers} from '../../../hooks/useUsers';
import HookPaginate from "../../../components/HookPaginate";

    function AdminUser() {
      const navigate= useNavigate();
    const {blockUser,list,remove,data,error}=useUsers();

    const [currentPage,setCurrentPage]=useState(1);
    const [limit,setLimit]=useState(2);
    const [total,setTotal]=useState(0);

    const fetchUsers = useCallback(async()=>{
           const result = await list({currentPage,limit});
           setTotal(result?.data?.total)
         
      },[list,currentPage,limit])
      const handleDelete =async(e,id,status)=>{ 
        e.preventDefault();
       try{
        const result = await Swal.fire({
          title:"Are you sure?",
          text:"You won't be able to revert this!",
          icon :"warning",
          showCancelButton:true,
          confirmButtonColor:"#3085d6",
          cancelButtonColor:"#d33",
          confirmButtonText:`yes ${!status?"Archive":"Unarchive"} user!`
         })
         if(result.isConfirmed){
          const resp = await remove(id,{isArchived:!status});
          if(resp){
            Swal.fire({
             title:!status?"Archive":"Unarchive",
             text:`${!status?"Archive":"Unarchive"} Successfull`,
             icon:"success"
            })
          list();}
          }
         }catch(e){
            alert(error||e)
         }
       }
      const handleBlockUser =async(e,id,status)=>{ 
        e.preventDefault();
       try{
        const result = await Swal.fire({
          title:"Are you sure?",
          text:"You won't be able to revert this!",
          icon :"warning",
          showCancelButton:true,
          confirmButtonColor:"#3085d6",
          cancelButtonColor:"#d33",
          confirmButtonText:`Yes,${status?"Blocked":"Unblock"} user!`,
         })
         if(result.isConfirmed){
          const resp = await blockUser(id,{isActive:!status});
          if(resp){
            Swal.fire({
             title:status?"Blocked":"Unblock",
             text:`${status?"Blocked":"Unblock"} Successfully`,
             icon:"success"
            })
          list();}
          }
         }catch(e){
            alert(error||e)
         }
       }
      
      
      useEffect(()=>{
         fetchUsers();
      },[fetchUsers])
      
      return (
        <div>
           <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
              <h1>Users List</h1></div>
        
            <div className="flex d-flex justify-content-end m-2">
              <Link to="/admin/users/add">
              <button className="btn btn-danger">
                Add Product
              </button>
              </Link>
            </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email </th>
              <th>Roles </th>
              <th>isActive</th>
              <th>isArchived </th>
              <th >Admin</th>
            </tr>
          </thead>
          <tbody>
        {data && data.length > 0 ? data.map((item ,idx)=>{
        return  <tr key={item?._id}>
          <td>{idx+1}</td>
          <td>{item?.name}</td>
          <td>{item?.email}&nbsp; {item?.isEmailVerified?<ShieldCheck className="text-blue-500"/>:null}</td>
          <td>{item?.roles.toString()}</td>
          <td>{item?.isActive ?"yes":"no"}</td>
          <td>{item?.isArchived ?"yes":"no"}</td>
          <td width="10%">
           <div className="d-flex gap-3 m-1"> 
            <MdDelete style={{color:"red" }} onClick={(e)=>{handleDelete(e,item?._id,item?.isArchived)}}/> 
           <MdEdit onClick={()=>  navigate(`/admin/users/${item?._id}`)}/>
          { item?.isActive? <UserX stroke="red" size={15} onClick={(e)=>  handleBlockUser(e,item?._id,item?.isActive)}/>
          : <UserCheck stroke="green" size={15} onClick={(e)=>  handleBlockUser(e,item?._id,item?.isActive)}/>}
          

           </div>
            
          </td>
        </tr>}):<tr><td colSpan={4} className="text-center">
              No users found
            </td></tr>}
          </tbody>
        </Table>
        <HookPaginate limit={limit} setCurrentPage={setCurrentPage} total={total} currentPage={currentPage}
    setLimit={setLimit}/>
        </div>
       
      );
    }
    
    export default AdminUser;
  


