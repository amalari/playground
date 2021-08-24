import { useQuery } from "@apollo/client";
import React, { forwardRef, useRef, useState } from "react";
import { useImperativeHandle } from "react";
import Link from "next/link";
import { Button, Spinner, Table } from "react-bootstrap";
import Image from "next/image";
import { CHALLENGES_QUERY } from "./challengeGql";

const ChallengeTable = (
  { showForm, onEdit, onDelete, onSubmit, onSetReviewer, onSetGrade, userId },
  ref
) => {
  let filter = {};
  if (userId !== "0") filter = { studentId: userId };
  const {
    data: challengesData,
    loading,
    error,
    refetch,
  } = useQuery(CHALLENGES_QUERY, {
    variables: {
      filter,
    },
  });
  useImperativeHandle(ref, () => ({
    refetch: () => {
      refetch();
    },
  }));
  const mine = (challenge) => {
    return (
      challenge.gradingStatus === "UNSUBMITTED" &&
      challenge.studentId === userId
    );
  };

  if (loading) return <Spinner animation="grow" />;

  return (
    <>
      {userId !== "0" && (
        <Button
          variant="success"
          className="mb-2 float-end"
          onClick={() => showForm(true)}
        >
          Add
        </Button>
      )}
      {challengesData.challenges.data.length === 0 ? (
        <div className="text-center">
          <Image src="/no-data.jpg" width="500" height="500" />
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Challenge</th>
              <th>Drive Url</th>
              <th>Student</th>
              <th>Reviewer</th>
              <th>Grade</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {challengesData.challenges.data.map((challenge, index) => (
              <tr key={challenge.id}>
                <td>{++index}</td>
                <td>{challenge.name}</td>
                <td>
                  {(
                    <Link href={challenge.googleDriveFolder}>
                      <a target="_blank">{challenge.googleDriveFolder}</a>
                    </Link>
                  ) || "-"}
                </td>
                <td>{challenge.student ? challenge.student.name : "-"}</td>
                <td>{challenge.reviewer ? challenge.reviewer.name : "-"}</td>
                <td>{challenge.grade || "-"}</td>
                <td>{challenge.gradingStatus}</td>
                <td>
                  {mine(challenge) && (
                    <Button
                      className="me-2"
                      variant="outline-secondary"
                      onClick={() => onEdit(challenge)}
                    >
                      Edit
                    </Button>
                  )}
                  {mine(challenge) && (
                    <Button
                      className="me-2"
                      variant="primary"
                      onClick={() => onSubmit(challenge)}
                    >
                      Submit
                    </Button>
                  )}
                  {userId === "0" && (
                    <>
                      <Button
                        className="me-2"
                        variant="outline-success"
                        onClick={() => onSetReviewer(challenge)}
                      >
                        Set Reviewer
                      </Button>
                      <Button
                        className="me-2"
                        variant="outline-primary"
                        onClick={() => onSetGrade(challenge)}
                      >
                        Set Grade
                      </Button>
                    </>
                  )}
                  <Button variant="danger" onClick={() => onDelete(challenge)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default forwardRef(ChallengeTable);
