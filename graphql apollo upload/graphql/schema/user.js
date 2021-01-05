const { gql } = require("apollo-server-express");

module.exports = gql`
scalar date
type User {
  _id: ID!
  name: String!
  email: String!
  password: String
  createdListing: [Listing!]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input UserInput {
  name: String!
  email: String!
  password: String!
}

extend type Query {
  login(email: String!, password: String!): AuthData!
}

extend type Mutation {
  createUser(userInput: UserInput): User
}
`;


