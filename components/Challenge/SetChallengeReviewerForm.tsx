import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { SET_REVIEWER_MUTATION } from "./challengeGql";
import ChallengeReviewerForm from "./ChallengeReviewerForm";

const SetChallengeReviewerForm = ({ onFinish, show, onHide, initValues }) => {
  const [setReviewer, { data, loading, error }] = useMutation(
    SET_REVIEWER_MUTATION,
    {
      onCompleted: () => {
        onFinish();
        onHide();
      },
    }
  );
  const handleSave = async (values) => {
    await setReviewer({
      variables: {
        input: values,
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
            Set Challenge Reviewer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12}>
                <ChallengeReviewerForm
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

export default SetChallengeReviewerForm;
