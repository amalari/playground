import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const ChallengeGradeForm = ({ onSave, initValues }) => {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState(initValues);
  const [isInvalid, setIsInvalid] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!form.grade) {
      setIsInvalid(true);
    } else {
      onSave(form);
    }
  };
  const grades = [1, 2, 3, 4, 5];

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="grade">
        <Form.Label>Grade</Form.Label>
        <Form.Select
          isInvalid={isInvalid}
          value={form.grade}
          onChange={(e) => {
            setIsInvalid(false);
            setForm({ ...form, grade: e.target["value"] });
          }}
        >
          <option value={undefined}>Select Grade</option>
          {grades.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
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

export default ChallengeGradeForm;
