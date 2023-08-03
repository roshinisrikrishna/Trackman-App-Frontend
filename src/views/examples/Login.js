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
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const LOGIN_URL = 'http://localhost:5000';

const initialState = {
  username: "",
  password: "",
};

const Login = () => {
  const [state, setState] = useState(initialState);
  const { username, password } = state;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log('clicked submit at login');
    e.preventDefault();
    axios.post(LOGIN_URL, {
      username,
      password,
    })
      .then(() => {
        // setState({ username: "", password: "" });
        toast.success("User logged in successfully");
        console.log('login sucess');
        setTimeout(() => navigate('/admin'), 500);
      })
      .catch((err) => {
        console.log("Error at login.js:", err);
        toast.error("Failed to log in");
        setState({ username: "", password: "" });      
    });
  };
  axios.defaults.withCredentials = true;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };



  return (
    <>
      <Col lg="5" md="7">
      <Card className="bg-transparent border-0">
          
          <CardBody className="px-lg-5 py-lg-5">
             <Form role="form" onSubmit={handleSubmit}>
             <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Username"
                    type="name"
                    autoComplete="new-username"
                    id="username"
                    name="username"
                    style={{
                      width: "300px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "20px",
                      paddingLeft: "60px", 
                    }}
                    value={username}
                    onChange={handleInputChange}
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

              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
               
              </div>
              <div className="text-center">
                <Button className="my-4" color="warning" type="submit" style={{ width: "300px", height: "40px",borderRadius: "30px" }}>
                  Sign in
                </Button>
              </div>
            </Form>
       
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6" key="create-account">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
        </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
