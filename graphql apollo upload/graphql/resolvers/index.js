const { GraphQLDateTime } = require("graphql-iso-date");

const authResolver = require("./auth");
const listingResolver = require("./listing");

const customScalarResolver = {
  Date: GraphQLDateTime,
};

module.exports = [customScalarResolver, authResolver, listingResolver];
