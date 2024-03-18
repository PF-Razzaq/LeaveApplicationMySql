import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../index";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Button,
} from "reactstrap";

const AddEmployee = (props) => {
  const [formData, setFormData] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    password_field: "",
    birthday: "",
    department: "",
    role: "",
    // employee_id: "",
  });

  useEffect(() => {
    if (props.employee) {
      const {
        id,
        first_name,
        last_name,
        email,
        password_field,
        birthday,
        department,
        role,
        // employee_id,
      } = props.employee;
      setFormData({
        id,
        first_name,
        last_name,
        email,
        password_field,
        birthday,
        department,
        role,
        // employee_id,
      });
    }
  }, [props.employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      console.log("Employee created successfully");
      props.resetState();
      props.toggle();
    } catch (error) {
      if (error.response) {
        console.error("Error creating:", error.response.data);
      } else {
        console.error("Error creating employee:", error.message);
      }
    }
  };

  const editEmployee = (e) => {
    e.preventDefault();
    axios
      .put(`${API_URL}${formData.id}/`, formData)
      .then(() => {
        props.resetState();
        props.toggle();
      })
      .catch((error) => {
        console.error("Error editing employee:", error);
      });
  };

  const defaultIfEmpty = (value) => {
    return value === "" ? "" : value;
  };

  return (
    <Form
      md={12}
      onSubmit={props.employee ? editEmployee : createEmployee}
      method="post"
    >
      <Container>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="first_name">First Name</Label>
              <Input
                type="text"
                name="first_name"
                id="first_name"
                value={defaultIfEmpty(formData.first_name)}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="last_name">Last Name</Label>
              <Input
                type="text"
                name="last_name"
                id="last_name"
                value={defaultIfEmpty(formData.last_name)}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                value={defaultIfEmpty(formData.email)}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="password_field">Password</Label>
              <Input
                type="password"
                name="password_field"
                id="password_field"
                value={defaultIfEmpty(formData.password_field)}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="birthday">Birthday</Label>
              <Input
                type="date"
                name="birthday"
                id="birthday"
                value={defaultIfEmpty(formData.birthday)}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="department">Department</Label>
              <Input
                type="select"
                name="department"
                id="department"
                value={defaultIfEmpty(formData.department)}
                onChange={handleChange}
                required
              >
                <option value="" disabled selected>
                  Select Department
                </option>
                <option value="Web Developer">Web Developer</option>
                <option value="HR">HR</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="w-100">
            <FormGroup>
              <Label for="role">Role</Label>
              <Input
                type="select"
                name="role"
                id="role"
                value={defaultIfEmpty(formData.role)}
                onChange={handleChange}
                required
              >
                <option value="" disabled selected>
                  Select Role
                </option>
                <option value="Web Developer">Web Developer</option>
                <option value="Tester">Tester</option>
                <option value="Admin">Admin</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Button className="w-100 bg-primary" type="submit">
          Submit
        </Button>
      </Container>
    </Form>
  );
};

export default AddEmployee;
