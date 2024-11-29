const express = require("express");

const app = express();
const errorMiddleware = require("./middlewares");

//Import exprss middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the MembershipCMS backend API" });
});
app.use(errorMiddleware.notfoundHandlerMiddleware);
app.use(errorMiddleware.errorHandlerMiddleware);

module.exports = app;
