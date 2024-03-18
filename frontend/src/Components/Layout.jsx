import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const pageTitle = getPageTitle(path);
    document.title = pageTitle;
  }, [location]);

  const getPageTitle = (path) => {
    switch (path) {
      case "/login":
        return "Login";
      case "/home":
        return "Home";
      case "/userrecord":
        return "User Record";
      case "/user":
        return "user";
      case "/userleaverecord":
        return "User Leave Record";
      case "/leaverequested":
        return "Leave Requested";

      default:
        break;
    }
  };

  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default Layout;
