import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import React,{useState,useEffect} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

const ADD_USER_URL = 'http://localhost:5000/users/create';

console.log('entered user page');
const initialState = {
    username:"",
    password:"",
    email_id:"",
    designation:"",
};

const Register = () => {
  console.log('clicked submit button');
  const [state,setState]=useState(initialState);
    const {username,password,email_id,designation} = state;
    const navigate = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!username || !email_id || !password || !designation)
        {
            toast.error("Please fill all the required fields");
        }
        else{
            console.log('entered adduser');
            axios.post(ADD_USER_URL,{
                username,
                password,
                email_id,
                designation
            }).then(()=>{
                setState({username:"",password:"",email_id:"",designation:""})
            }).catch((err)=>toast.error(err.response.data));
            toast.success("User created successfully");
            setTimeout(()=>navigate('/admin/index'),500);
        }
    }
    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setState({...state,[name]:value});
    }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-transparent border-0">
          
          <CardBody className="px-lg-5 py-lg-5">
            
            <Form role="form" onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <Input
                    type="text" 
                    id="username" 
                    name="username" 
                    placeholder="Username"
                    value={username}
                    onChange={handleInputChange}
                    style={{
                      width: "300px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "20px",
                      paddingLeft: "60px",
                    }}
                  />
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText
                      style={{
                        backgroundColor: "transparent",
                        borderRadius: "20px",
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>

              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <Input
                    type="text" 
                    id="email_id" 
                    name="email_id" 
                    placeholder="Email Id"
                    value={email_id}
                    onChange={handleInputChange}
                    autoComplete="new-email"
                    style={{
                      width: "300px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "20px",
                      paddingLeft: "60px",
                    }}
                  />
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText
                      style={{
                        backgroundColor: "transparent",
                        borderRadius: "20px",
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Password"
                    value={password}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                    style={{
                      width: "300px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "20px",
                      paddingLeft: "60px",
                    }}
                  />
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText
                      style={{
                        backgroundColor: "transparent",
                        borderRadius: "20px",
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>

              <div className="text-muted font-italic mb-3">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <Input
                    type="text" 
                    id="designation" 
                    name="designation" 
                    placeholder="Designation"
                    value={designation}
                    onChange={handleInputChange}
                    style={{
                      width: "300px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "20px",
                      paddingLeft: "60px",
                    }}
                  />
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText
                      style={{
                        backgroundColor: "transparent",
                        borderRadius: "20px",
                        position: "absolute",
                        left: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <i className="ni ni-badge" />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>

              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="warning" type="submit" style={{ width: "400px", height: "40px",borderRadius: "30px" }}>
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
