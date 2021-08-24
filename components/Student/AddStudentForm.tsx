import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import StudentForm from "./StudentForm"
import { ADD_STUDENT_MUTATION } from "./studentGql"

const AddStudentForm = ({onFinish}) => {
    const [show, setShow] = useState(false)
    const [addStudent, {data, loading, error, }] = useMutation(ADD_STUDENT_MUTATION, {
        onCompleted: () => {
            onFinish()
            setShow(false)
        }
    })
    const initValues = {
        name: '',
        email: '',
    }
    const handleSave = async (values) => {
        await addStudent({
            variables: {
                input: values,
            }    
        })
    }

    return (
        <>
            <Button variant="success" className="mb-2 float-end" onClick={() => setShow(true)}>Add</Button>
            <Modal show={show} onHide={() => setShow(false)} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Student
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs={12}>
                                <StudentForm initValues={initValues} onSave={handleSave} />
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddStudentForm