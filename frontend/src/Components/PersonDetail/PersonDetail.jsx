import React from "react";
import "./PersonDetail.css";

const PersonDetail = () => {
  return (
    <>
      <h1 className="name">Name</h1>
      <div className="persondetail">
        <div className="left">
          <div className="img">Pakistan</div>
        </div>
        <div className="right">
          <div className="employeedetail">
            <div>
              <h5>Employee Name</h5>
              <p></p>
            </div>
            <div>
              <h5>Start Date</h5>
              <p></p>
            </div>
            <div>
              <h5>End Date</h5>
              <p></p>
            </div>
            <div>
              <h5>Duration</h5>
              <p></p>
            </div>
            <div>
              <h5>Type</h5>
              <p></p>
            </div>
            <div>
              <h5>Status</h5>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonDetail;
