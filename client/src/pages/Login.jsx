import {Form,Row,Col, Button} from "react-bootstrap"
import { Link } from "react-router-dom"
const Login=()=>{



  return (
    
    <div style={{
      backgroundColor: '#FFDAB9'}}className="container-fluid overflow-hidden m-5 p-5">
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
          <Form.Control type="email"placeholder="email"></Form.Control>
          </Form.Group>
          <Form.Group as={Row}style={{
              border: '1px solid #ccc',
              borderRadius: '4px',
            }} >
          <Form.Control type="password" placeholder="password"></Form.Control>
          </Form.Group>
        </Col>
        <Row >
        <Form.Group as={Col} className="mx-2" >
        <Form.Check type="checkbox"  style={{ fontWeight: 500 }}label=" Remember for 30 days"></Form.Check>
        </Form.Group>
        <Form.Group as={Col} xs="auto" className="mx-3" >
       <Link to="/forgetPassword"> Forgot password</Link> 
        </Form.Group>
        </Row>
        <Col className=" d-grid gap-4 m-4 mt-5">
         
          <Form.Group as={Row} >
          <Button variant="primary" type="submit"> Sign up</Button>
          </Form.Group>
          <Form.Group xs="auto" >
            Dont have an account? <Link to="/sign up">Sign up</Link>
          </Form.Group>
        </Col>
        
    </Form>
    </div>
  )
}

export default Login