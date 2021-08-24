import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const ChallengeForm = ({ onSave, initValues }) => {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState(initValues);
  const handleSubmit = (event) => {
    const formEl = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (formEl.checkValidity() === false) {
      setValidated(true);
    } else {
      onSave(form);
    }
  };

  const handleInput = (key, e) => {
    setForm({ ...form, [key]: e.target["value"] });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          defaultValue={form.name}
          onInput={(e) => handleInput("name", e)}
          required
          type="text"
          placeholder="Input Challenge Name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Google Drive Url</Form.Label>
        <Form.Control
          defaultValue={form.googleDriveFolder}
          onInput={(e) => handleInput("googleDriveFolder", e)}
          type="text"
          placeholder="Input Challenge Url"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ChallengeForm;
