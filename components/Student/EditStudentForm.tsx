import { useMutation, useQuery } from "@apollo/client"
import React, { forwardRef, useImperativeHandle, useState } from "react"
import * as _ from 'lodash'
import { Col, Container, Modal, Row, Spinner } from "react-bootstrap"
import StudentForm from "./StudentForm"
import { STUDENT_QUERY, UPDATE_STUDENT_MUTATION } from "./studentGql"

const EditStudentForm = ({id, onFinish}, ref) => {
    const [show, setShow] = useState(false)
    useImperativeHandle(ref, () => ({
        setShow: (val) => {
          setShow(val);
        }
      })
    );
    const {data: studentData, loading, error} = useQuery(STUDENT_QUERY, {
        variables: {
            filter: {
               id, 
            },
        },
    })
    const [updateStudent, {data, loading: updateLoading, error: updateError, }] = useMutation(UPDATE_STUDENT_MUTATION, {
        onCompleted: () => {
            onFinish()
            setShow(false)
        }
    })

    if(loading) return <Spinner animation="grow" />
    
    const initValues = _.pick(studentData.student, ['id', 'name', 'email']);
    const handleSave = async (values) => {
        await updateStudent({
            variables: {
                input: values,
            }    
        })
    }

    return (
        <>
            <Modal show={show} onHide={() => setShow(false)} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Student
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs={12}>
                                {show && <StudentForm initValues={initValues} onSave={handleSave} />}
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default forwardRef(EditStudentForm)