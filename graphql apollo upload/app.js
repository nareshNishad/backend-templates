const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");

const app = express();
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mobile-app-backend.dxs48.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(console.log("DB Connected"))
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());

app.use(isAuth);

const server = new ApolloServer({
  introspection: true,
  typeDefs: graphQlSchema,
  resolvers: graphQlResolvers,
  context: ({ req, res }) => ({ req, res }),
});

server.applyMiddleware({ app, path: "/graphql" });

app.use(express.static("public"));
const port = process.env.PORT || 3000;

app.listen({ port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`);
});
