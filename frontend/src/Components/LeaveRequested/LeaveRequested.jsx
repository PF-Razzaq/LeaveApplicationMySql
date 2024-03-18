import React, { useState, useEffect } from "react";
import { Table, Row, Col, Button } from "reactstrap";
import { API_URL_LEAVE } from "../Api/api";
import axios from "axios";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const LeaveRequested = () => {
  const navigate = useNavigate();
  const [leaveData, setLeaveData] = useState([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL_LEAVE);
        setLeaveData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleAction = async (id, newStatus, rejectionStatus) => {
    console.log(
      "id, newStatus, rejectionStatus",
      id,
      newStatus,
      rejectionStatus
    );
    try {
      const existingLeaveData = leaveData.find((data) => data.id === id);
      const statusUpdate = {
        status: newStatus !== null ? newStatus : existingLeaveData.status,
        start_date: existingLeaveData.start_date,
        end_date: existingLeaveData.end_date,
        leave_type: existingLeaveData.leave_type,
        reason: existingLeaveData.reason,
        reject_reason:
          rejectionStatus !== null ? rejectionStatus : existingLeaveData.reject,
      };

      const response = await axios.put(`${API_URL_LEAVE}${id}`, statusUpdate);

      const updatedResponse = await axios.get(API_URL_LEAVE);
      setLeaveData(updatedResponse.data);
      setShow(!show);
    } catch (error) {
      console.error("Error:", error.response || error.message || error);
    }
  };

  return (
    <>
      <Header />

      <div className="d-flex">
        <Sidebar />
        <Row style={{ width: "70%", margin: "50px auto" }}>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/home");
              }}
            >
              Back
            </button>
            <Col md={12} className="m-auto mt-5">
              <Table>
                <thead>
                  <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Days</th>
                    <th>Leave Type</th>
                    <th>Status</th>
                    {/* <th>Reason</th> */}
                    <th>Action</th>
                    <th>Reject Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {!leaveData || leaveData.length <= 0 ? (
                    <tr>
                      <td colSpan="6" align="center">
                        <b>Ops, no one here yet</b>
                      </td>
                    </tr>
                  ) : (
                    leaveData.map((leaveData) => (
                      <tr key={leaveData.pk}>
                        <td>{leaveData.start_date}</td>
                        <td>{leaveData.end_date}</td>
                        <td>{leaveData.days}</td>
                        <td>{leaveData.leave_type}</td>
                        <td>
                          {leaveData.status === 0 && <td>Pending</td>}
                          {leaveData.status === 1 && <td>Approved</td>}
                          {leaveData.status === 2 && <td>Rejected</td>}
                        </td>
                        {/* <td>{leaveData.reason}</td> */}
                        <td>
                          {leaveData.status === 0 && (
                            <>
                              <Button
                                className="btn btn-success me-2"
                                onClick={() =>
                                  handleAction(leaveData.id, 1, null)
                                }
                              >
                                Approve
                              </Button>
                              <Button
                                className="btn btn-danger"
                                onClick={() =>
                                  handleAction(leaveData.id, 2, null)
                                }
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {/* {leaveData.status === 1 && (
                          <Button className="btn btn-warning" disabled>
                            Approved
                          </Button>
                        )}
                        {leaveData.status === 2 && (
                          <Button className="btn btn-danger" disabled>
                            Rejected
                          </Button>
                        )} */}
                        </td>
                        <td>
                          <input
                            type="text"
                            onBlur={(e) => {
                              e.preventDefault();
                              handleAction(leaveData.id, null, e.target.value);
                            }}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Col>
          </div>
        </Row>
      </div>
    </>
  );
};

export default LeaveRequested;
