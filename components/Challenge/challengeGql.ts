import { gql } from "@apollo/client";

export const CHALLENGES_QUERY = gql`
  query challenges($filter: ChallengeFilterInput) {
    challenges(filter: $filter) {
      data {
        id
        name
        googleDriveFolder
        gradingStatus
        grade
        reviewerId
        studentId
        student {
          id
          name
          email
        }
        reviewer {
          id
          name
          email
        }
      }
      meta {
        page
        limit
        total
      }
    }
  }
`;

export const CHALLENGE_QUERY = gql`
  query challenge($filter: ChallengeFilterInput) {
    challenge(filter: $filter) {
      id
      name
      googleDriveFolder
      gradingStatus
      grade
    }
  }
`;

export const ADD_CHALLENGE_MUTATION = gql`
  mutation addChallenge($input: CreateChallengeInput!) {
    createChallenge(input: $input) {
      id
      name
      googleDriveFolder
      gradingStatus
      grade
    }
  }
`;

export const UPDATE_CHALLENGE_MUTATION = gql`
  mutation updateChallenge($input: UpdateChallengeInput!) {
    updateChallenge(input: $input) {
      id
      name
      googleDriveFolder
      gradingStatus
      grade
    }
  }
`;

export const DELETE_CHALLENGE_MUTATION = gql`
  mutation removeChallenge($id: String!) {
    removeChallenge(id: $id)
  }
`;

export const SUBMIT_CHALLENGE_MUTATION = gql`
  mutation submitChallenge($id: String!) {
    submitChallenge(id: $id) {
      id
    }
  }
`;

export const SET_REVIEWER_MUTATION = gql`
  mutation setReviewer($input: SetReviewerChallengeInput!) {
    setReviewer(input: $input) {
      id
    }
  }
`;

export const SET_GRADE_MUTATION = gql`
  mutation setGrade($input: SetGradeChallengeInput!) {
    setGrade(input: $input) {
      id
    }
  }
`;
