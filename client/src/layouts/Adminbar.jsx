import { Link } from 'react-router-dom';
import {BsCart3} from 'react-icons/bs';
import { IoLogOutOutline } from "react-icons/io5";
import {Button,Badge} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack'

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { setloggedOut } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../utils/session';



   const Adminbar =()=>{
    const navigate=useNavigate()
    const {user}=useSelector((state)=>state.auth)
       const dispatch= useDispatch();
      
    const [IsdropDown,setIsdropDown]=useState(false);
 const toggleDropdown=()=>{
      setIsdropDown(!IsdropDown);
 }
 const closeDropdown=()=>{
      setIsdropDown(false);
 }
 const handleLogOut=(e)=>{
  e.preventDefault();

dispatch(setloggedOut());
removeToken();
navigate("/");
 }

  return (
   
    <Navbar fixed="top"expand="lg" className="bg-body-tertiary " expanded={IsdropDown}>
      <Container fluid>
        <Navbar.Brand ><Link to="/admin/dashboard" className='text-decoration-none text-black-50'>
        Lazona (Admin)</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"  onClick={toggleDropdown}/>
        <Navbar.Collapse data-bs-toggle="dropdown">
          <Nav className="me-auto ">
          
              <Link to ="/admin/products"className='nav-link text-decoration-none' onClick={closeDropdown}>
              Products</Link>
             
              <Link to ="/admin/categories"className='nav-link text-decoration-none'onClick={closeDropdown}>Categories</Link>
              <Link to ="/admin/orders"className='nav-link text-decoration-none'onClick={closeDropdown}>Orders</Link>
            
              <Link to ="/admin/users"className='nav-link text-decoration-none'onClick={closeDropdown}>Users</Link>
              
             </Nav>
             <Nav className='d-inline-flex me-3'>Welcome {user?.name}</Nav>
          <Stack direction="horizontal" gap={3} className=" px-2 ">
          
           <Button onClick={(e)=>{handleLogOut(e)}}>
          
           <IoLogOutOutline />
           
           </Button>
            
           </Stack>
         
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Adminbar;