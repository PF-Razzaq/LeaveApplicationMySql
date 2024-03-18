import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <div className="text-center" style={{ marginTop: "-30px", color: "#111" }}>
      {" "}
      Copyright @ Leave Management System {date}
    </div>
  );
};

export default Footer;
