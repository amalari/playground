import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { Col, Container, Modal, Row } from "react-bootstrap"
import { useAuthState } from "../../context/context"
import ChallengeForm from "./ChallengeForm"
import { ADD_CHALLENGE_MUTATION } from "./challengeGql"

const AddChallengeForm = ({onFinish, show, onHide}) => {
    const auth = useAuthState()
    const [addChallenge, {data, loading, error, }] = useMutation(ADD_CHALLENGE_MUTATION, {
        onCompleted: () => {
            onFinish()
            onHide()
        }
    })
    const initValues = {
        name: '',
        googleDriveFolder: '',
        studentId: auth.user.id
    }
    const handleSave = async (values) => {
        await addChallenge({
            variables: {
                input: values,
            }    
        })
    }

    return (
        <>
            <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Challenge
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs={12}>
                                <ChallengeForm initValues={initValues} onSave={handleSave} />
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddChallengeForm