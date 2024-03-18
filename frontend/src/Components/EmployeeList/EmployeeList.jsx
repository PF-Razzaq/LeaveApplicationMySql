import React from "react";
import { Table, Row, Col } from "reactstrap";
import ConfirmRemovalModal from "../ConfirmRemovalModal";
import NewEmployeeModal from "../NewEmployeeModal";
import DataTable from "react-data-table-component";

const EmployeeList = (props) => {
  const { employees } = props;
  const columns = [
    { name: "First Name", selector: (row) => row.first_name },
    { name: "Last Name", selector: (row) => row.last_name },
    { name: "Email", selector: (row) => row.email },
    { name: "Password", selector: (row) => row.password_field },
    { name: "Birthday", selector: (row) => row.birthday },
    { name: "Department", selector: (row) => row.department },
    { name: "Role", selector: (row) => row.role },
    { name: "Action", selector: (row) => row.status },
  ];
  return (
    <>
      <Table dark>
        <Row>
          <Col md={12} className="m-auto">
            <h2 className="mt-5 text-center bg-white text-dark py-3 fs-3">
              Employee Data
            </h2>
            <Table>
              <thead>
                <tr>
                  <th>Employee Id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Birthday</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {!employees || employees.length <= 0 ? (
                  <tr>
                    <td colSpan="6" align="center">
                      <b>Ops, no one here yet</b>
                    </td>
                  </tr>
                ) : (
                  employees.map((employee) => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.first_name}</td>
                      <td>{employee.last_name}</td>
                      <td>{employee.email}</td>
                      <td>
                        <input
                          type="password"
                          style={{
                            width: "100px",
                            border: "none",
                            outline: "none",
                          }}
                          readOnly
                          value={employee.password_field}
                        />
                      </td>
                      <td>{employee.birthday}</td>
                      <td>{employee.department}</td>
                      <td>{employee.role}</td>
                      <td>
                        <NewEmployeeModal
                          create={false}
                          employee={employee}
                          resetState={props.resetState}
                        />
                        &nbsp;&nbsp;
                        <ConfirmRemovalModal
                          id={employee.id}
                          resetState={props.resetState}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Table>
    </>
  );
};

export default EmployeeList;
