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
        <Navbar.Brand href="/">Lazona</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
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
           
           <a className="btn btn-light " href='/cart'>
            <BsCart3 /> &nbsp;
            <Badge bg="secondary">Cart</Badge>
            </a>
            <a className="btn btn-light " href='/login'>
           <MdOutlineLogin />
            </a>
           </Stack>
         
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default ENavbar;