import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    addUser(username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      token
      user {
        _id
        username
        email
        password
        firstName
        lastName
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($username: String, $email: String, $password: String!) {
    login(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_DONATION = gql`
  mutation Donate($amount: Int!, $message: String, $pet: ID, $user: ID) {
    donate(amount: $amount, message: $message, pet: $pet, user: $user) {
      _id
      amount
    }
  }
`;