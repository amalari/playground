import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { STUDENTS_QUERY } from '../Student/studentGql'
import { useAuthState, staff, useAuthDispatch } from "../../context/context";
import { loginUser } from "../../context/actions";

const Login = (props) => {
    const auth = useAuthState()
    const dispatch = useAuthDispatch();
    const { data: studentData, loading, error } = useQuery(STUDENTS_QUERY);
    const [isStaff, setIsStaff] = useState(auth.user.id === "0")

    const handleLogin = (id) => {
        if (id === "0"){
            loginUser(dispatch, staff)
        } else {
            loginUser(dispatch, studentData.students.data.find((student) => student.id === id))
        }

        props.onHide()
    }
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col xs={12} className='text-center'>
                            {loading && <Spinner animation="grow" />}
                            {!loading && 
                            <>
                                <Button variant="outline-primary" active={isStaff} onClick={() => handleLogin("0")}>Staff</Button>
                                <span className="mx-3">or</span>
                                <Button variant="outline-primary" active={!isStaff} onClick={() => setIsStaff(false)}>Student</Button>
                                <br />
                                <br />
                                { !isStaff && <><Form.Select defaultValue={auth.user.id} onChange={(e) => handleLogin(e.target['value'])}>
                                    <option>Login as Student</option>
                                    {studentData.students.data.map((student) => <option key={student.id} value={student.id}>{student.email}</option>)}
                                </Form.Select></> }
                            </>
                            }
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default Login