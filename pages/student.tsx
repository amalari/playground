import StaffLayout from './../components/Layouts/Staff'
import type { ReactElement } from 'react'
import dynamic from 'next/dynamic'
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";
import React from 'react';
import { Container, Table } from 'react-bootstrap';
import StudentTable from '../components/Student/StudentTable';
import AddChallengeForm from '../components/Challenge/AddChallengeForm';


const Index = () => {
  return (
    <Container className="my-4">
      <StudentTable />
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