import { Link } from 'react-router-dom';
import {BsCart3} from 'react-icons/bs';
import {MdOutlineLogin } from 'react-icons/md'
import {Button,Badge} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack'
import { useState } from 'react';
import { useSelector } from 'react-redux';
  


   const ENavbar =()=>{
    const quantity=useSelector((state)=>state.cart.quantity)
      
    const [IsdropDown,setIsdropDown]=useState(false);
 const toggleDropdown=()=>{
      setIsdropDown(!IsdropDown);
 }
 const closeDropdown=()=>{
      setIsdropDown(false);
 }

  return (
   
    <Navbar fixed="top"expand="lg" className="bg-body-tertiary " expanded={IsdropDown}>
      <Container fluid>
        <Navbar.Brand ><Link to="/" className='text-decoration-none text-black-50'>
        Lazona</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"  onClick={toggleDropdown}/>
        <Navbar.Collapse data-bs-toggle="dropdown">
          <Nav className="me-auto ">
          
              <Link to ="/products"className='nav-link text-decoration-none' onClick={closeDropdown}>
              Products</Link>
             
              <Link to ="/about"className='nav-link text-decoration-none'onClick={closeDropdown}>About</Link>
            
              <Link to ="/contact"className='nav-link text-decoration-none'onClick={closeDropdown}>Contact</Link>
              
             </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Stack direction="horizontal" gap={3} className=" px-2 ">
           <Link to ='/cart'className="btn btn-light " >

            <BsCart3 /> &nbsp;
            <Badge bg="secondary">{quantity ?? 0}</Badge>
            
           </Link>
           <Link to ='/login'className="btn btn-light " >
          
           <MdOutlineLogin />
           
           </Link>
            
           </Stack>
         
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default ENavbar;