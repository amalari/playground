import { gql } from "@apollo/client";

export const CHALLENGES_QUERY = gql`
  query challenges {
    challenges {
      data {
        id
        name
        goolgeDriveFolder
        gradingStatus
        grade
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
      goolgeDriveFolder
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
      goolgeDriveFolder
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
      goolgeDriveFolder
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
