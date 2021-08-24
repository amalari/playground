import { useQuery } from "@apollo/client";
import React, { forwardRef, useRef, useState } from "react"
import { useImperativeHandle } from "react";
import { Button, Col, Row, Spinner, Table } from "react-bootstrap"
import { CHALLENGES_QUERY } from "./challengeGql";

const ChallengeTable = ({showForm, onEdit, onDelete}, ref) => {
    const { data: challengesData, loading, error, refetch } = useQuery(CHALLENGES_QUERY);
    useImperativeHandle(ref, () => ({
        refetch: () => {
            refetch();
        }
      })
    );
    if(loading) return <Spinner animation="grow" />

    return (
        <>
            <Button variant="success" className="mb-2 float-end" onClick={() => showForm(true)}>Add</Button>
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
                    {challengesData.challenges.data.map((challenge, index) => 
                        <tr key={challenge.id}>
                            <td>{++index}</td>
                            <td>{challenge.name}</td>
                            <td>{challenge.goolgeDriveFolder || '-'}</td>
                            <td>-</td>
                            <td>-</td>
                            <td>{challenge.grade || '-'}</td>
                            <td>{challenge.gradingStatus}</td>
                            <td>
                                <Button className="me-2" variant="outline-secondary" onClick={() => onEdit(challenge)}>Edit</Button>
                                <Button variant="danger" onClick={() => onDelete(challenge)}>Delete</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>   
    )
}

export default forwardRef(ChallengeTable)