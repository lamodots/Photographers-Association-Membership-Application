const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const {
  notfoundHandlerMiddleware,
  errorHandlerMiddleware,
} = require("./middlewares");
const {
  adminAuthRoutes,
  appSettingsRoutes,
  announcementsRoutes,
} = require("./routes");

const corsOptions = { origin: "http://localhost:3000", credentials: true };
//Import exprss middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the MembershipCMS backend API" });
});
app.use("/api/v1/secure/auth", adminAuthRoutes);
app.use("/api/v1/secure/settings", appSettingsRoutes);
app.use("/api/v1/secure/announcement", announcementsRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client/build/index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Support Desk API" });
  });
}
app.use(notfoundHandlerMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
