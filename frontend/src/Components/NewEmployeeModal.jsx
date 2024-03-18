import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import AddEmployee from "./AddEmployee/AddEmployee";

const NewEmployeeModal = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal((previousModal) => !previousModal);
  };

  const { create } = props;

  const title = create ? "Creating New Employee" : "Editing Employee";
  const button = create ? (
    <Button
      color="primary"
      className="float-end me-5"
      onClick={toggle}
      style={{ minWidth: "180px" }}
    >
      Add Employee
    </Button>
  ) : (
    <Button onClick={toggle}>Edit</Button>
  );
  return (
    <>
      {button}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <AddEmployee
            style={{ minWidth: "100%" }}
            resetState={props.resetState}
            toggle={toggle}
            employee={props.employee}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default NewEmployeeModal;
