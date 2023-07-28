
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import React,{useState,useEffect} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

const initialState = {
  username:"",
  password:"",
  email_id:"",
  designation:"",
};

const Profile = () => {
  const [state,setState]=useState(initialState);

    const {username,password,email_id,designation} = state;

    const navigate = useNavigate();

    const {id}=useParams();

    useEffect(()=>{
        const EDIT_URL = `http://localhost:5000/user/get/${id}`

        axios.get(EDIT_URL)
        .then((resp)=>setState({...resp.data[0] }));
    },[id]);

    const handleSubmit = (e) =>{
      console.log('clicked edit button');
        e.preventDefault();
        if(!username || !email_id || !password || !designation)
        {
            toast.error("Please fill all the required fields");
        }
        else{
            axios
            .put(`http://localhost:5000/user/update/${id}`,{
                username,
                password,
                email_id,
                designation
            })
            .then(()=>{
                setState({username:"",password:"",email_id:"",designation:""})
            }).catch((err)=>toast.error(err.response.data));
            toast.success("User updated successfully");
            setTimeout(()=>navigate('/users'),500);
        }
    };

    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setState({...state,[name]:value});
    }

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
         
          <Col className="order-xl-1" xl="8">
            <Card className="bg-primary shadow">
              
              <CardBody>
                <Form onSubmit={handleSubmit}>
                <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="secondary"
                      // href="#pablo"
                      type="submit"
                      size="lg"
                    >
                      EDIT
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Username"
                            value={username||""}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text" 
                            id="email_id" 
                            name="email_id" 
                            placeholder="email_id"
                            value={email_id||""}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="password"
                            value={password||""}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Designation
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="text" 
                            id="designation" 
                            name="designation" 
                            placeholder="designation"
                            value={designation||""}
                            onChange={handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            id="input-address"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="New York"
                            id="input-city"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="United States"
                            id="input-country"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Postal code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder="Postal code"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                        Open Source."
                        type="textarea"
                      />
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
