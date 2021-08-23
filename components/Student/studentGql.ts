import { gql } from "@apollo/client";

export const STUDENTS_QUERY = gql`
  query Students {
    students {
      data {
        id
        name
        email
      }
      meta {
        page
        limit
        total
      }
    }
  }
`;

export const STUDENT_QUERY = gql`
  query student($filter: StudentFilterInput) {
    student(filter: $filter) {
      id
      name
      email
    }
  }
`;

export const ADD_STUDENT_MUTATION = gql`
  mutation addStudent($input: CreateStudentInput!) {
    createStudent(input: $input) {
      id
      name
      email
    }
  }
`;
