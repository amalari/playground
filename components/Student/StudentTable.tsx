import { useQuery } from "@apollo/client";
import React, { useRef } from "react"
import { Button, Spinner, Table } from "react-bootstrap"
import AddStudentForm from "./AddStudentForm";
import EditStudentForm from "./EditStudentForm";
import { STUDENTS_QUERY } from "./studentGql";

const StudentTable = () => {
    const { data: studentData, loading, error, refetch } = useQuery(STUDENTS_QUERY);
    const editStudentFormRef = useRef(null)
    if(loading) return <Spinner animation="grow" />

    return (
        <>
            <AddStudentForm onFinish={() => refetch()} />
            <EditStudentForm ref={editStudentFormRef} />
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
                    {studentData.students.data.map((student, index) => 
                        <tr key={student.id}>
                            <td>{++index}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td><Button onClick={() => editStudentFormRef.current.setShow(true)}>Edit</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>   
    )
}

export default StudentTable