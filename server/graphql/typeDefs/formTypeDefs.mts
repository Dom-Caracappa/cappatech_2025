// file: server/graphql/typeDefs/formTypeDefs.mts

import { gql } from "graphql-tag";

export default gql`
  type ContactFormSubmission {
    id: ID!
    name: String!
    email: String!
    subject: String!
    message: String!
    submittedAt: String!
  }

  input ContactFormInput {
    name: String!
    email: String!
    subject: String!
    message: String!
  }

  type Query {
    getSubmissions: [ContactFormSubmission]
  }

  type Mutation {
    submitForm(input: ContactFormInput!): ContactFormSubmission
  }
`;
