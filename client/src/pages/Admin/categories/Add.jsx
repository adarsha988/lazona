import { useState } from 'react';
import { Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useCategories } from '../../../hooks/useCategories';

function Add() {
  const navigate=useNavigate();
  const{create,error}=useCategories();
  const[name,setName]=useState("");

  const handleSubmit=async(e)=>{
  try{
    e.preventDefault();
 const data = await create(name);
 if(data.msg==="Success") return navigate("/admin/categories")   
  }catch(e){
alert(error||e)
  }finally{
    setName("")
  }
  }
  return (
  <div className='container' style={{ border:'2px solid #ccc', boxSizing:"border-box"}}>
<h1 className='mb-4'>Add new categories</h1>
<div  className="d-flex justify-content-center">
<Form onSubmit={(e)=>{handleSubmit(e)}}>
      <Form.Group className="mb-3" >
        <Form.Label>New Category</Form.Label>
        <Form.Control type="text" value={name||""}style={{width:"20rem", height:"2rem", padding:"1rem"}} placeholder="Enter category" onChange={(e)=>setName(e.target.value)}/>
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

export default Add;
