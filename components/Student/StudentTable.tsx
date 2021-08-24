import { useQuery } from "@apollo/client";
import React, { useRef, useState } from "react";
import { Button, Col, Row, Spinner, Table } from "react-bootstrap";
import Image from "next/image";
import AddStudentForm from "./AddStudentForm";
import DeleteStudentConfirm from "./DeleteStudentConfirm";
import EditStudentForm from "./EditStudentForm";
import { STUDENTS_QUERY } from "./studentGql";

const StudentTable = () => {
  const {
    data: studentData,
    loading,
    error,
    refetch,
  } = useQuery(STUDENTS_QUERY);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const editStudentFormRef = useRef(null);
  const deleteStudentConfirmRef = useRef(null);
  if (loading) return <Spinner animation="grow" />;

  const handleEdit = (student) => {
    setSelectedStudent(student);
    editStudentFormRef.current.setShow(true);
  };

  const handleDelete = (student) => {
    setSelectedStudent(student);
    deleteStudentConfirmRef.current.confirm();
  };
  return (
    <>
      <Row>
        <Col>
          <h3>List of Student</h3>
        </Col>
        <Col>
          <AddStudentForm onFinish={() => refetch()} />
        </Col>
      </Row>
      {studentData.students.data.length === 0 ? (
        <div className="text-center">
          <Image src="/no-data.jpg" width="500" height="500" />
        </div>
      ) : (
        <>
          <EditStudentForm
            onFinish={() => refetch()}
            id={selectedStudent?.id}
            ref={editStudentFormRef}
          />
          <DeleteStudentConfirm
            onFinish={() => refetch()}
            id={selectedStudent?.id}
            ref={deleteStudentConfirmRef}
          />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {studentData.students.data.map((student, index) => (
                <tr key={student.id}>
                  <td>{++index}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <Button
                      className="me-2"
                      variant="outline-secondary"
                      onClick={() => handleEdit(student)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(student)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default StudentTable;
