import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flip, Slide, toast } from "react-toastify";

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import Header from "../Header/Header";
import axios from "axios";
import { API_URL } from "../Api/api";

const LoginForm = () => {
  const [employee, setEmployees] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getEmployees = async () => {
    try {
      const res = await axios.get(API_URL);
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((preFormData) => ({
      ...preFormData,
      [id]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const matchingAdmin = employee.find(
        (data) =>
          data.email === formData.email &&
          data.password_field === formData.password &&
          data.role === "Admin"
      );
      const matchingUser = employee.find(
        (data) =>
          data.email === formData.email &&
          data.password_field === formData.password
      );
      let loggedInUser = null;
      let loggedInAdmin = null;
      if (matchingAdmin) {
        loggedInAdmin = matchingAdmin;
        toast.success(
          `Welcome ${matchingAdmin.first_name} ${matchingAdmin.last_name}.`,
          {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          }
        );
        navigate("/home");
      } else if (matchingUser) {
        loggedInUser = matchingUser;
        toast.success(
          `Welcome ${matchingUser.first_name} ${matchingUser.last_name}`,
          {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          }
        );
        navigate("/user");
      } else {
        toast.error(`Invalid credentials. Please try again.`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });
        setError("Invalid credentials. Please try again.");
        throw new Error("Invalid Credentials");
      }
      localStorage.setItem("allEmployees", JSON.stringify(employee));
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      localStorage.setItem("loggedInAdmin", JSON.stringify(loggedInAdmin));
    } catch (error) {
      console.error("Error occurred while logging in", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Header />
      <Container fluid className="bg-gradient mb-5">
        <Row className="justify-content-center align-items-center mt-5">
          <Col md={5}>
            <Form onSubmit={handleLogin} method="post">
              {error && <Alert color="danger">{error}</Alert>}
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </FormGroup>

              <Button className="col-md-12" color="primary" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginForm;
