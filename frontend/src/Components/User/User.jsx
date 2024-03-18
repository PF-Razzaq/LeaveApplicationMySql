import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL_LEAVE } from "../Api/api";
import Header from "../Header/Header";
import SidebarUser from "../Sidebar/SidebarUser";
import Leave from "../Leave/Leave";
import UserLeaveSection from "./UserLeaveSection";

const User = () => {
  const [leaves, setLeaves] = useState([]);

  const getLeaves = async () => {
    try {
      const res = await axios.get(API_URL_LEAVE);
      setLeaves(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const resetState = () => {
    getLeaves();
  };

  useEffect(() => {
    resetState();
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex">
        <SidebarUser />
        <UserLeaveSection leaves={leaves} />
      </div>
    </>
  );
};

export default User;
