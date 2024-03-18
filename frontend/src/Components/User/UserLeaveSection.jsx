import React from "react";
import { useNavigate } from "react-router-dom";
import { Col } from "reactstrap";

const UserLeaveSection = (props) => {
  const { leaves } = props;
  const navigate = useNavigate();
  return (
    <>
      <Col>
        <div
          className="my-div"
          style={{
            width: "420px",
            backgroundColor: "gray",
            display: "flex",
            padding: "80px 20px",
            margin: "30px 0px 0px 50px",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h4
            style={{
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/userleaverecord");
            }}
          >
            Leave Applied & Show Your Leaves
            {/* {leaves.length} */}
          </h4>
        </div>
      </Col>
    </>
  );
};

export default UserLeaveSection;
