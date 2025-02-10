import { useState } from 'react';
import { Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useUsers } from '../../../hooks/useUsers';

function AddUser() {
  const navigate=useNavigate();
  const{create,error}=useUsers();
  const[payload,setPayload]=useState({
    name:"",
    email:"",
    password:"",
    roles:""
  });

  const handleSubmit=async(e)=>{
  try{
    e.preventDefault();
 const data = await create(payload);
 
if(data.msg==="Success") {
  alert("user added successfully")
  return navigate("/admin/users") }  
  }catch(e){
alert(error||e)
  }finally{
    setPayload({
      name:"",
      email:"",
      password:"",
      roles:""
    })
  }
  }
  return (
  <div className='container' style={{ border:'2px solid #ccc', boxSizing:"border-box"}}>
<h1 className='mb-4'>Add new Users</h1>
<div  className="d-flex justify-content-center">
<Form onSubmit={(e)=>{handleSubmit(e)}}>
      <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={payload?.name||""}style={{width:"20rem", height:"2rem", padding:"1rem"}} placeholder="Enter name" onChange={(e)=>setPayload((prev)=>{return{...prev,name:e.target.value}})}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" value={payload?.email||""}style={{width:"20rem", height:"2rem", padding:"1rem"}} placeholder="Enter email" onChange={(e)=>setPayload((prev)=>{return{...prev,email:e.target.value}})}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>password</Form.Label>
        <Form.Control type="text" value={payload?.password||""}style={{width:"20rem", height:"2rem", padding:"1rem"}} placeholder="Enter password" onChange={(e)=>setPayload((prev)=>{return{...prev,password:e.target.value}})}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Role</Form.Label>
        <Form.Select value={payload?.roles} onChange={(e)=>setPayload((prev)=>{return{...prev,roles:e.target.value}})}>
        <option>Open this select menu</option>
        <option value="admin">admin</option>
        <option  value="user">user</option>
        </Form.Select>
      </Form.Group>
     <Stack direction="horizontal"gap={3}>
       <Button variant="primary" type="submit" className='px-5'>
        Submit
      </Button>
    <Link to="/admin/categories">
    <Button variant="danger" type="submit" className='btn-sm p-1'>
        Go back
      </Button>
    </Link>  
     </Stack>
    </Form>
    </div>
  </div>
   
  );
}

export default AddUser;
