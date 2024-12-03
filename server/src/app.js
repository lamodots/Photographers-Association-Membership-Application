const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const errorMiddleware = require("./middlewares");
const { adminAuthRoutes } = require("./routes");

//Import exprss middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the MembershipCMS backend API" });
});
app.use("/api/v1/secure/auth", adminAuthRoutes);
app.use(errorMiddleware.notfoundHandlerMiddleware);
app.use(errorMiddleware.errorHandlerMiddleware);

module.exports = app;
