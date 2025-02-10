
import { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import{Form,Button,Row,Col,Table} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useOrders } from '../../../hooks/useOrders';


function Editorder() {
  const {id}=useParams();
  const navigate=useNavigate();
  const{updateById,getById,error}=useOrders();
  const[order,setOrder]=useState({});
 


  const handleSubmit=async(e)=>{
  try{
    e.preventDefault();
    const details=order
    const{created_at,_id, isArchived ,updated_at,...payload}=details;
    const data=await updateById(id,payload);
    if(data.msg==="success"){
     return navigate("/admin/orders")
    } 
       
  }catch(e){

alert(error||e)
  }finally{
    setOrder("")
  }
  }    

  useEffect(()=>{
        const data =async()=>{
        const fetchData=await getById(id);
        setOrder(fetchData);
         
      }
        data();
  },[getById,id])
  return (
  <Row className='container' style={{ border:'2px solid #ccc', boxSizing:"border-box"}}>
<Col className="d-flex justify-content-center">
<Form onSubmit={(e)=>{handleSubmit(e)}}>
      <Form.Group className="mb-3" >
        <Form.Label><h3>Update Order no. {order?.id}</h3></Form.Label>
        </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Buyers Name</Form.Label>
        <Form.Control type="text"
         value={order?.name||""}style={{width:"20rem", height:"2rem", 
          padding:"1rem"}} placeholder="Enter Buyer Name" 
        onChange={(e)=>setOrder((prev)=>{ return {...prev,name:e.target.value}})}/>
      </Form.Group>
     
      <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <Form.Control type="text"
         value={order?.email||""}style={{width:"20rem", height:"2rem", 
          padding:"1rem"}} placeholder="Enter Buyer Email" 
        onChange={(e)=>setOrder((prev)=>{ return {...prev,email:e.target.value}})}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Buyers Address</Form.Label>
        <Form.Control type="text"
         value={order?.address||""}style={{width:"20rem", height:"2rem", 
          padding:"1rem"}} placeholder="Enter Buyer Address" 
        onChange={(e)=>setOrder((prev)=>{ return {...prev,address:e.target.value}})}/>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Payment method</Form.Label>
        <Form.Control type="text"
         value={order?.paymentMethod||""}style={{width:"20rem", height:"2rem", 
          padding:"1rem"}} placeholder="Enter Payment Method " 
        onChange={(e)=>setOrder((prev)=>{ return {...prev,paymentMethod:e.target.value}})}/>
      </Form.Group>
      <Form.Group>
      <Form.Label>Payment Status</Form.Label>
         <Form.Select value={order?.status} onChange={(e)=>setOrder((prev)=>{ return {...prev,status:e.target.value}})}>
      <option>Open this select menu</option>
      <option value="pending">pending</option>
      <option value="completed">completed</option>
      <option value="failed">failed</option>
    </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Amount</Form.Label>
        <Form.Control type="text"
         value={order?.amount||""}style={{width:"20rem", height:"2rem", 
          padding:"1rem"}} placeholder="Enter Amount" 
        onChange={(e)=>setOrder((prev)=>{ return {...prev,amount:e.target.value}})}/>
      </Form.Group>
      
      
     <Stack direction="horizontal"gap={3}>
       <Button variant="primary" type="submit" className='px-5'>
        Update
      </Button>
    <Link to="/admin/orders">
    <Button variant="danger" type="submit" className='btn-sm p-1'>
        Go back
      </Button>
    </Link>  
     </Stack>
    </Form>
    </Col>
    <Col>
    <Table striped bordered hover>
          <thead >
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th >Price (Rs)</th>
              <th >Amount (Rs)</th>
            </tr>
          </thead>
          <tbody>
        {order && order?.products?.length > 0 ? order?.products.map((item ,idx)=>{
        return  <tr key={item?._id}>
          <td>{idx+1}</td>
          <td>{item?.name}</td>
          <td>{item?.quantity}</td>
          <td>{item?.price}</td>
          <td>{item?.amount}</td>
        </tr>}):<tr><td colSpan={5} className="text-center">
              No Products
            </td></tr>}
          </tbody>
        </Table>
    </Col>
  </Row>
   
  );
}

export default Editorder;

