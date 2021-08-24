import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { STUDENTS_QUERY } from "../Student/studentGql";

const ChallengeReviewerForm = ({ onSave, initValues }) => {
  const [validated, setValidated] = useState(false);
  const { data: studentData, loading, error } = useQuery(STUDENTS_QUERY);
  const [form, setForm] = useState(initValues);
  const [isInvalid, setIsInvalid] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!form.reviewerId) {
      setIsInvalid(true);
    } else {
      onSave(form);
    }
  };
  if (loading) return <Spinner animation="grow" />;

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="reviewerId">
        <Form.Label>Reviewer</Form.Label>
        <Form.Select
          isInvalid={isInvalid}
          value={form.reviewerId}
          onChange={(e) => {
            setIsInvalid(false);
            setForm({ ...form, reviewerId: e.target["value"] });
          }}
        >
          <option value={undefined}>Select Reviewer</option>
          {studentData.students.data.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ChallengeReviewerForm;
