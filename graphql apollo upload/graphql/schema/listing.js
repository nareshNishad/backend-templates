const { gql } = require("apollo-server-express");


module.exports = gql`
  type Listing {
    _id: ID!
    images: [String!]
    title: String!
    price: Float!
    category: String!
    description: String!
    creator: User!
  }

  input ListingInput {
    images: Upload
    title: String!
    price: Float!
    category: String!
    description: String!
  }

  extend type Query {
    getListing(user: String): [Listing!]!
  }
  extend type Mutation {
    addListing(listingInput: ListingInput): Listing
  }
`;
