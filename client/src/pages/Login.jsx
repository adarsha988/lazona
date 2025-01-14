import {Form,Row,Col, Button} from "react-bootstrap"
import { Link } from "react-router-dom"
import { loginUser } from "../slices/authSlice";
import { useCallback, useEffect, useState} from "react";
import { useDispatch,useSelector } from "react-redux";
const Login=()=>{
const dispatch= useDispatch();
const { isLoggedIn}= useSelector((state)=>state.auth)
const [signUp,setSignup]=useState({email:"",password:""})
const handleSubmit=(e)=> {
  e.preventDefault();
 
 dispatch(loginUser(signUp));
}

  return (
    
    <div style={{
      backgroundColor: '#E6E6FA'}}className="container-fluid overflow-hidden my-5 p-5 col-12 col-md-8 col-lg-6">
      <Form>
       <div className="text-start mx-2">
        <p className=" text-muted mb-1"style={{ fontWeight: 500 }}>Please enter your details</p>
       <p className="fs-1 fw-bold">Welcome back</p>
       </div>
        <Col className=" d-grid gap-4 m-4 mt-5">
          <Form.Group as={Row}style={{
              border: '1px solid #ccc',
              borderRadius: '4px',
            }} >
          <Form.Control type="email"placeholder="email" value={signUp.email} onChange={(e)=>{  setSignup((prev)=> {return{...prev,email:e.target.value}})}}></Form.Control>
          </Form.Group>
          <Form.Group as={Row}style={{
              border: '1px solid #ccc',
              borderRadius: '4px',
            }} >
          <Form.Control type="password" placeholder="password" value={signUp.password} onChange={(e)=>{  setSignup((prev)=> {return{...prev,password:e.target.value}})}}></Form.Control>
          </Form.Group>
        </Col>
        <Row >
        <Form.Group as={Col} className="mx-2" >
        <Form.Check
  type="checkbox"
  label="Remember for 30 days"
  style={{ display: 'flex', alignItems: 'center' }}
>
  <Form.Check.Input
    type="checkbox"
    style={{
      width: '20px',
      height: '20px',
      border: '2px solid #ccc', 
      borderRadius: '4px', 
    }}
  />
  <Form.Check.Label style={{ marginLeft: '8px', fontWeight: 500 }}>
    Remember for 30 days
  </Form.Check.Label>
</Form.Check>

        </Form.Group>
        <Form.Group as={Col} xs="auto" className="mx-3" >
       <Link to="/forgetPassword"> Forgot password</Link> 
        </Form.Group>
        </Row>
        <Col className=" d-grid gap-4 m-4 mt-5">
         
          <Form.Group as={Row} >
          <Button variant="primary" type="submit" onClick={(e)=>handleSubmit(e)} > Sign up</Button>
          </Form.Group>
          <Form.Group xs="auto" >
            Dont have an account? <Link to="/signup">Sign up</Link>
          </Form.Group>
        </Col>
        
    </Form>
    </div>
  )
}

export default Login