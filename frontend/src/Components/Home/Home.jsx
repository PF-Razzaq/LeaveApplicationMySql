import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Body from "../Body/Body";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        {" "}
        <Header />
        <div className="d-flex">
          <Sidebar />
          <Body />
        </div>
      </div>
    </>
  );
};

export default Home;
