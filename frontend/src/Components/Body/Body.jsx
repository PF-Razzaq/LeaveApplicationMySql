import React, { useState, useEffect } from "react";
import "./Body.css";
import { Container, Row, Col } from "reactstrap";

import axios from "axios";
import { API_URL, API_URL_LEAVE } from "../Api/api";
import { useNavigate } from "react-router-dom";

const Body = (props) => {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [show, setShow] = useState(true);

  const navigate = useNavigate();
  const getEmployees = async () => {
    try {
      const res = await axios.get(API_URL);
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  const getLeaves = async () => {
    try {
      const res = await axios.get(API_URL_LEAVE);
      setLeaves(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const resetState = () => {
    getEmployees();
    getLeaves();
  };

  useEffect(() => {
    resetState();
  }, []);

  return (
    <div className="body">
      <main className="main-leave">
        <div className={`parent ${show ? "" : "d-none"}`}></div>
        <div className={`leaves ${show ? "" : "d-none"}`}>
          <Container className={`parent ${show ? "" : "hidden"}`}>
            <Row>
              <Col>
                <div
                  className="my-div"
                  onClick={() => {
                    navigate("/userrecord");
                  }}
                >
                  Registered Employee {employees.length}
                </div>
              </Col>
              <Col>
                <div
                  className="my-div"
                  onClick={() => {
                    navigate("/leaverequested");
                  }}
                >
                  Leave Requested {leaves.length}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </main>
    </div>
  );
};

export default Body;
