
import { MdDelete,MdEdit } from "react-icons/md"; 
import { CheckCircle } from "lucide-react";
import { useCallback, useEffect } from 'react';
import Swal from "sweetalert2";
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from 'react-router-dom';
import { useOrders } from '../../../hooks/useOrders';

    function Adminorder() {
      const navigate= useNavigate();
    const {list,remove,approve,data}=useOrders();
    const fetchOrders = useCallback(()=>{
      list();
      },[list])

      const handleApprove=async(e,id,status)=>{
        e.preventDefault();
        const result= await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
          if (result.isConfirmed) {
          const state= status==="pending" ? {status:"completed"}:{status:"pending"}
          const resp=await approve(id,state)
          
          if(resp)
         { Swal.fire(
            "Approve",
            "Approve successful",
            "success"
          )}
          list()
          }}
      const handleDelete=async(e,id)=>{
        e.preventDefault();
        const result= await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Approve it!"
        })
          if (result.isConfirmed) {
          await remove(id)
          
            Swal.fire(
              "Deleted!",
              "Deleted Successfully",
             "success"
            );
          } 
          list()
        }
      const handleChange=(e,id)=>{
        e.preventDefault();
        navigate(`/admin/orders/${id}`)
      }
      
      useEffect(()=>{
         fetchOrders();
      },[fetchOrders])
      
      return (
        <div>
          <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
              <h1>Orders List</h1></div>
        
            <div className="flex d-flex justify-content-end m-2">
              <Link to="/admin/orders/add">
              <button className="btn btn-danger">
                Add Product
              </button>
              </Link>
            </div>
        <Table striped bordered hover>
          <thead>
            <tr>
             
              <th> Order Id</th>
              <th>Buyer Email</th>
              <th >Amount</th>
              <th >Status</th>
              <th >Actions</th>
            </tr>
          </thead>
          <tbody>
        {data && data.length > 0 ? data.map((item ,idx)=>{
        return  <tr key={item?._id}>
      
          <td>{item?._id}</td>
          <td>{item?.email}</td>
          <td>{item?.amount}</td>
          <td>{item?.status}</td>
          <td width="10%">
           <div className="d-flex gap-3 m-1"> 
            <MdDelete style={{color:"red" }} onClick={(e)=>{handleDelete(e,item?.id)}}/> 
           <MdEdit onClick={(e)=>{handleChange(e,item?._id)}} />
            <CheckCircle className="text-green-500" size={15} onClick={(e)=>{handleApprove(e,item?._id,item?.status)}}/> 
           </div>
            
          </td>
        </tr>}):<tr><td colSpan={4} className="text-center">
              No orders found
            </td></tr>}
          </tbody>
        </Table>
        </div>
       
      );
    }
    
    export default Adminorder;
  

