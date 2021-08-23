import { useMutation, useQuery } from "@apollo/client"
import React, { forwardRef, useImperativeHandle, useState } from "react"
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap"
import StudentForm from "./StudentForm"
import { STUDENT_QUERY } from "./studentGql"

const EditStudentForm = (props, ref) => {
    const [show, setShow] = useState(false)
    useImperativeHandle(ref, () => ({
        setShow: (val) => {
          setShow(val);
        }
      })
    );
    // const {data: studentData, loading, error} = useQuery(STUDENT_QUERY, {
    //     variables: {
    //         filter: {
    //            id: studentId, 
    //         },
    //     },
    // })
    // if(loading) return <Spinner animation="grow" />
    
    const initValues = {
        name: '',
        email: '',
    }
    const handleSave = async (values) => {
        // await addStudent({
        //     variables: {
        //         input: values,
        //     }    
        // })
    }

    return (
        <>
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

export default forwardRef(EditStudentForm)