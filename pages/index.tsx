import StaffLayout from "./../components/Layouts/Staff";
import { ReactElement, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";
import React from "react";
import { Container, Nav, Tab, Tabs } from "react-bootstrap";
import ChallengeTable from "../components/Challenge/ChallengeTable";
import AddChallengeForm from "../components/Challenge/AddChallengeForm";
import EditChallengeForm from "../components/Challenge/EditChallengeForm";
import DeleteChallengeConfirm from "../components/Challenge/DeleteChallengeConfirm";
import SubmitChallengeConfirm from "../components/Challenge/SubmitChallengeConfirm";
import SetChallengeReviewerForm from "../components/Challenge/SetChallengeReviewerForm";
import SetChallengeGradeForm from "../components/Challenge/SetChallengeGradeForm";
import { useAuthState } from "../context/context";
import ReviewrChallengeTable from "../components/Challenge/ReviewerChallengeTable";

const Index = () => {
  const auth = useAuthState();
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [showFormReviewer, setShowReviewer] = useState(false);
  const [showFormGrade, setShowFormGrade] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [tab, setTab] = useState("challenge");
  const deleteDialogEl = useRef(null);
  const submitDialogEl = useRef(null);
  const tableEl = useRef(null);

  useEffect(() => {
    if (showSubmitDialog) {
      submitDialogEl.current.confirm();
    }
    if (showDeleteDialog) {
      deleteDialogEl.current.confirm();
    }
  }, [selectedChallenge]);
  const handleEdit = (challenge) => {
    setSelectedChallenge(challenge);
    setShowFormEdit(true);
  };

  const handleSetReviewer = (challenge) => {
    setSelectedChallenge(challenge);
    setShowReviewer(true);
  };

  const handleSetGrade = (challenge) => {
    setSelectedChallenge(challenge);
    setShowFormGrade(true);
  };

  const handleDelete = (challenge) => {
    setSelectedChallenge(challenge);
    setShowDeleteDialog(true);
  };

  const handleSubmit = (challenge) => {
    setSelectedChallenge(challenge);
    setShowSubmitDialog(true);
  };

  const handleFinish = () => tableEl.current.refetch();
  const challangeTable = (
    <>
      <SubmitChallengeConfirm
        onFinish={() => {
          setShowSubmitDialog(false);
          handleFinish();
        }}
        id={selectedChallenge?.id}
        ref={submitDialogEl}
      />
      <AddChallengeForm
        onFinish={handleFinish}
        show={showForm}
        onHide={() => setShowForm(false)}
      />
      {selectedChallenge && showFormEdit && (
        <EditChallengeForm
          onFinish={handleFinish}
          id={selectedChallenge?.id}
          show={showFormEdit}
          onHide={() => setShowFormEdit(false)}
        />
      )}
      {selectedChallenge && showFormReviewer && (
        <SetChallengeReviewerForm
          initValues={{
            id: selectedChallenge?.id,
            reviewerId: selectedChallenge?.reviewerId,
          }}
          onFinish={handleFinish}
          show={showFormReviewer}
          onHide={() => setShowReviewer(false)}
        />
      )}
      {selectedChallenge && showFormGrade && (
        <SetChallengeGradeForm
          initValues={{
            id: selectedChallenge?.id,
            grade: selectedChallenge?.grade,
          }}
          onFinish={handleFinish}
          show={showFormGrade}
          onHide={() => setShowFormGrade(false)}
        />
      )}
      <DeleteChallengeConfirm
        onFinish={() => {
          setShowDeleteDialog(false);
          handleFinish();
        }}
        id={selectedChallenge?.id}
        ref={deleteDialogEl}
      />
      <ChallengeTable
        userId={auth.user.id}
        onSubmit={handleSubmit}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSetReviewer={handleSetReviewer}
        onSetGrade={handleSetGrade}
        ref={tableEl}
        showForm={setShowForm}
      />
    </>
  );

  const reviwerTable = <ReviewrChallengeTable userId={auth.user.id} />;
  const studentView = (
    <Tabs
      defaultActiveKey="challenge"
      className="mb-3"
      onSelect={(val) => setTab(val)}
    >
      <Tab eventKey="challenge" title="Challenge">
        {tab === "challenge" && challangeTable}
      </Tab>
      <Tab eventKey="review" title="Review">
        {tab === "review" && reviwerTable}
      </Tab>
    </Tabs>
  );

  return (
    <Container className="my-4">
      {auth.user.id === "0" ? challangeTable : studentView}
    </Container>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  const AuthProvider = dynamic(() => import("./../context/AuthProvider"), {
    ssr: false,
  });

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <StaffLayout>{page}</StaffLayout>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default Index;
