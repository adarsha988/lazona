import { MdDelete,MdEdit } from "react-icons/md"; 
import { useCallback, useEffect } from 'react';
import Swal from "sweetalert2";
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from 'react-router-dom';
import { useCategories } from '../../../hooks/useCategories';

    function Admin() {
      const navigate= useNavigate();
    const {list,remove,data,error}=useCategories();
    const fetchCategories = useCallback(()=>{
      list();
      },[list])
      const handleDelete =async(e,id)=>{
        e.preventDefault();
       try{
        const result = await Swal.fire({
          title:"Are you sure?",
          text:"You won't be able to revert this!",
          icon :"warning",
          showCancelButton:true,
          confirmButtonColor:"#3085d6",
          cancelButtonColor:"#d33",
          confirmButtonText:"Yes, delete it!",
         })
         if(result.isConfirmed){
          const resp = await remove(id);
          if(resp){
            Swal.fire({
             title:"Deleted!",
             text:"Deleted Sucessful.",
             icon:"success"
            })
          list();}
          }
         }catch(e){
            alert(error||e)
         }
       }
      
      
      useEffect(()=>{
         fetchCategories();
      },[fetchCategories])
      
      return (
        <div>
           <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
              <h1>Categories List</h1></div>
        
            <div className="flex d-flex justify-content-end m-2">
              <Link to="/admin/categories/add">
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
              <th>Slug</th>
              <th >Admin</th>
            </tr>
          </thead>
          <tbody>
        {data && data.length > 0 ? data.map((item ,idx)=>{
        return  <tr key={item?._id}>
          <td>{idx+1}</td>
          <td>{item?.name}</td>
          <td>{item?.slug}</td>
          <td width="10%">
           <div className="d-flex gap-3 m-1"> 
            <MdDelete style={{color:"red" }} onClick={(e)=>{handleDelete(e,item?._id)}}/> 
           <MdEdit onClick={()=>  navigate(`/admin/categories/${item?._id}`)}/>
           </div>
            
          </td>
        </tr>}):<tr><td colSpan={4} className="text-center">
              No categories found
            </td></tr>}
          </tbody>
        </Table>
        </div>
       
      );
    }
    
    export default Admin;
  

