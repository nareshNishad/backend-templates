const userTypes = `
type User {
  _id: ID!
  name: String!
  email: String!
  password: String
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
  name: String
}

input UserInput {
  name: String!
  email: String!
  password: String!
}
`;
const userQuery = `
  login(email: String!, password: String!): AuthData!
`;
const userMutation = `
  createUser(userInput: UserInput): User
 `;

module.exports = {
  userTypes,
  userQuery,
  userMutation,
};
