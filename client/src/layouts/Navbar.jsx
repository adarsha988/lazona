import { Link } from 'react-router-dom';
import {BsCart3} from 'react-icons/bs';
import {MdOutlineLogin } from 'react-icons/md'
import {Button,Badge} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack'
  
   const ENavbar =()=>{
  return (
   
    <Navbar fixed="top"expand="lg" className="bg-body-tertiary ">
      <Container fluid>
        <Navbar.Brand ><Link to="/" className='text-decoration-none text-black-50'>
        Lazona</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
          
              <Link to ="/products"className='nav-link text-decoration-none'>
              Products</Link>
             
              <Link to ="/about"className='nav-link text-decoration-none'>About</Link>
              
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
            <Badge bg="secondary">Cart</Badge>
            
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