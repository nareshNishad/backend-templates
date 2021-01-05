const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 8000;
mongoose
  .connect(
    `mongodb+srv://main_admin:Ubl3jwePbunuMDU4@mobile-app-backend.dxs48.mongodb.net/SellIt-mobile-app?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log("DB Connection error", err);
  });
