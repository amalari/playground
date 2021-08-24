import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { SET_GRADE_MUTATION } from "./challengeGql";
import ChallengeGradeForm from "./ChallengeGradeForm";

const SetChallengeGradeForm = ({ onFinish, show, onHide, initValues }) => {
  const [setGrade, { data, loading, error }] = useMutation(SET_GRADE_MUTATION, {
    onCompleted: () => {
      onFinish();
      onHide();
    },
  });
  const handleSave = async (values) => {
    await setGrade({
      variables: {
        input: {
          ...values,
          grade: Number(values.grade),
        },
      },
    });
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Set Challenge Grade
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12}>
                <ChallengeGradeForm
                  initValues={initValues}
                  onSave={handleSave}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SetChallengeGradeForm;
