import React, { useState, useEffect } from "react";
import { API_URL_LEAVE } from "../Api/api";
import Header from "../Header/Header";
import SidebarUser from "../Sidebar/SidebarUser";
import { Container, Button, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Leave from "../Leave/Leave";
import axios from "axios";
import NewLeaveModel from "../NewLeaveModel";

const UserLeaveRecord = (props) => {
  const [formData, setFormData] = useState([]);

  const navigate = useNavigate();
  const getLeaveData = async () => {
    try {
      const res = await axios.get(API_URL_LEAVE);
      setFormData(res.data);
    } catch (error) {
      console.error("Error fetching Leave Data:", error);
    }
  };

  const resetState = () => {
    getLeaveData();
  };

  useEffect(() => {
    resetState();
  }, []);
  return (
    <>
      <Header />
      <div className="d-flex">
        <SidebarUser />
        <Container md={12}>
          <Button
            onClick={() => {
              navigate("/user");
            }}
            className="btn btn-primary px-5 mt-5 py-2 ms-5"
          >
            Back
          </Button>
          <Row>
            <Col>
              <Leave leaveData={formData} resetState={resetState} />
            </Col>
          </Row>
          <Row>
            <Col>
              <NewLeaveModel creates={true} resetState={resetState} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserLeaveRecord;
