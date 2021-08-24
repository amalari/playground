import { useQuery } from "@apollo/client";
import React from "react";
import Link from "next/link";
import { Spinner, Table } from "react-bootstrap";
import Image from "next/image";
import { CHALLENGES_QUERY } from "./challengeGql";

const ReviewrChallengeTable = ({ userId }) => {
  const {
    data: challengesData,
    loading,
    error,
  } = useQuery(CHALLENGES_QUERY, {
    variables: {
      filter: {
        reviewerId: userId,
      },
    },
  });
  if (loading) return <Spinner animation="grow" />;

  return (
    <>
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
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ReviewrChallengeTable;
