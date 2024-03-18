import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row } from "reactstrap";
import { API_URL } from "../Api/api";
import EmployeeList from "../EmployeeList/EmployeeList";
import NewEmployeeModal from "../NewEmployeeModal";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const UserRecord = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const getEmployees = async () => {
    try {
      const res = await axios.get(API_URL);
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  const resetState = () => {
    getEmployees();
  };

  useEffect(() => {
    resetState();
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <Container>
          <button
            onClick={() => {
              navigate("/home");
            }}
            className="btn btn-primary px-5 mt-5 py-2 ms-5"
          >
            Back
          </button>
          <Row>
            <Col>
              <EmployeeList employees={employees} resetState={resetState} />
            </Col>
          </Row>
          <Row>
            <Col>
              <NewEmployeeModal create={true} resetState={resetState} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserRecord;
