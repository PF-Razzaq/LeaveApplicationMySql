import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Zoom, toast } from "react-toastify";
import { MdDashboard } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { Button } from "reactstrap";
import axios from "axios";
import { API_URL } from "../Api/api";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

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
  const loggedInUser = localStorage.getItem("loggedInUser");
  const getUser = loggedInUser ? JSON.parse(loggedInUser) : "";
  return (
    <>
      <div className="main-div">
        <div className="left">
          <div className="sidebar">
            <main className="main">
              <div
                className="dashboard"
                onClick={() => {
                  navigate("/user");
                }}
              >
                <MdDashboard className="icon" />
                <h4>Dashboard</h4>
              </div>
              <div
                className="leave"
                onClick={() => {
                  navigate("/userleaverecord");
                }}
              >
                <RiPagesLine className="icon" />
                <h4>Leave Section</h4>
              </div>
            </main>
            <div className="logout">
              <div>Logged in as:</div>
              <div>
                {getUser.first_name} {getUser.last_name}
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
