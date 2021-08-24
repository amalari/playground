import StaffLayout from './../components/Layouts/Staff'
import { ReactElement, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";
import React from 'react';
import { Container, Table } from 'react-bootstrap';
import ChallengeTable from '../components/Challenge/ChallengeTable';
import AddChallengeForm from '../components/Challenge/AddChallengeForm';
import EditChallengeForm from '../components/Challenge/EditStudentForm';
import DeleteChallengeConfirm from '../components/Challenge/DeleteChallengeConfirm';


const Index = () => {
  const [showForm, setShowForm] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const deleteDialogEl = useRef(null)
  const tableEl = useRef(null)

  const handleEdit = (challenge) => {
    setSelectedChallenge(challenge)
    setShowForm(true)
  }

  const handleDelete = (student) => {
    setSelectedChallenge(student)
    deleteDialogEl.current.confirm()
  }

  const handleFinish = () => tableEl.current.refetch()
  return (
    <Container className="my-4">
      <AddChallengeForm onFinish={handleFinish} show={showForm} onHide={() => setShowForm(false)} />
      <EditChallengeForm onFinish={handleFinish} id={selectedChallenge?.id} show={showForm} onHide={() => setShowForm(false)} />
      <DeleteChallengeConfirm onFinish={handleFinish} id={selectedChallenge?.id} ref={deleteDialogEl} />
      <ChallengeTable onEdit={handleEdit} onDelete={handleDelete} ref={tableEl} showForm={setShowForm} />
    </Container>
	);
}

Index.getLayout = function getLayout(page: ReactElement) {
  const AuthProvider = dynamic(() => import('./../context/AuthProvider'), { ssr: false })

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <StaffLayout>
          {page}
        </StaffLayout>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default Index;