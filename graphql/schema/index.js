const { buildSchema } = require("graphql");

const { userTypes, userQuery, userMutation } = require("./user");

module.exports = buildSchema(`

${userTypes}

${userQuery}

${userMutation}



schema {
  query: RootQuery
  mutation: RootMutation
}
`);
