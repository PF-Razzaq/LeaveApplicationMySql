import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, Container } from "reactstrap";
import ApplyLeave from "./ApplyLeave/ApplyLeave";

const NewLeaveModel = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal((previousModal) => !previousModal);
  };

  const { creates } = props;

  const title = creates && "Apply Leave";
  const button = creates && (
    <Button
      color="primary"
      className="float-end me-5"
      onClick={toggle}
      style={{ minWidth: "180px" }}
    >
      Apply Leave
    </Button>
  );

  return (
    <>
      <Container>
        {button}
        <Modal isOpen={modal} toggle={toggle} md={10}>
          <ModalHeader toggle={toggle}>{title}</ModalHeader>
          <ModalBody>
            <ApplyLeave
              style={{ minWidth: "100%" }}
              resetState={props.resetState}
              toggle={toggle}
              employee={props.apply_leave}
            />
          </ModalBody>
        </Modal>
      </Container>
    </>
  );
};

export default NewLeaveModel;
