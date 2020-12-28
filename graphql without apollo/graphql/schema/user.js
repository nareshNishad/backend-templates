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
}

input UserInput {
  name: String!
  email: String!
  password: String!
}
`;
const userQuery = `
type RootQuery {
  login(email: String!, password: String!): AuthData!
}
`;
const userMutation = `
 type RootMutation {
  createUser(userInput: UserInput): User
}
 `;

module.exports = {
  userTypes,
  userQuery,
  userMutation,
};
