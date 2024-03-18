import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Zoom, toast } from "react-toastify";

import { MdDashboard } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { Button } from "reactstrap";
import { MdPeopleAlt } from "react-icons/md";
import axios from "axios";
import { API_URL } from "../Api/api";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [show, setShow] = useState(false);

  const getEmployees = async () => {
    try {
      const res = await axios.get(API_URL);
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const matchingAdmin = () => {
    employees.find((data) => data.role === "Admin");
  };

  const resetState = () => {
    getEmployees();
  };

  useEffect(() => {
    resetState();
  }, []);

  const loggedInAdmin = localStorage.getItem("loggedInAdmin");
  const getAdmin = loggedInAdmin ? JSON.parse(loggedInAdmin) : "";
  return (
    <>
      <div className="main-div">
        <div className="left">
          <div className="sidebar">
            <main className="main">
              <div
                className="dashboard"
                onClick={() => {
                  navigate("/home");
                }}
              >
                <MdDashboard className="icon" />
                <h4>Dashboard</h4>
              </div>
              <div className="leave">
                <RiPagesLine className="icon" />
                <h4
                  onClick={() => {
                    navigate("/leaverequested");
                  }}
                >
                  Leave Section
                </h4>
              </div>
              {matchingAdmin && (
                <div
                  className="employee"
                  onClick={() => {
                    navigate("/userrecord");
                  }}
                >
                  <MdPeopleAlt className="icon" />
                  <h4>Employee Section</h4>
                </div>
              )}
            </main>
            <div className="logout">
              <div>Logged in as:</div>
              <div>
                {getAdmin.first_name} {getAdmin.last_name}
              </div>
              <Button
                color="danger"
                onClick={() => {
                  toast.warn(`Logging Out`, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Zoom,
                  });
                  localStorage.removeItem("allEmployees");
                  localStorage.removeItem("loggedInUser");
                  localStorage.removeItem("loggedInAdmin");
                  navigate("/");
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
