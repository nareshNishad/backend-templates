const { buildSchema } = require("graphql");

const { userTypes, userQuery, userMutation } = require("./user");

module.exports = buildSchema(`

  ${userTypes}

type RootQuery {
  ${userQuery}
}

type RootMutation {
  ${userMutation}
}


schema {
  query: RootQuery
  mutation: RootMutation
}
`);
