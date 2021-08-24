import { useMutation, useQuery } from "@apollo/client"
import React from "react"
import * as _ from 'lodash'
import { Col, Container, Modal, Row, Spinner } from "react-bootstrap"
import ChallengeForm from "./ChallengeForm"
import { CHALLENGE_QUERY, UPDATE_CHALLENGE_MUTATION } from "./challengeGql"
import { useAuthState } from "../../context/context"

const EditChallengeForm = ({id, onFinish, show, onHide}) => {
    const auth = useAuthState()
    const {data: challengeData, loading, error} = useQuery(CHALLENGE_QUERY, {
        variables: {
            filter: {
               id, 
            },
        },
    })
    const [updateChallenge, {data, loading: updateLoading, error: updateError, }] = useMutation(UPDATE_CHALLENGE_MUTATION, {
        onCompleted: () => {
            onFinish()
            onHide()
        }
    })

    if(loading) return <Spinner animation="grow" />
    
    const initValues = _.pick(challengeData.challenge, ['id', 'name', 'goolgeDriveFolder']);
    const handleSave = async (values) => {
        await updateChallenge({
            variables: {
                input: {
                    ...values,
                    studentId: auth.user.id
                },
            }    
        })
    }

    return (
        <>
            <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Challenge
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs={12}>
                                {show && <ChallengeForm initValues={initValues} onSave={handleSave} />}
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditChallengeForm