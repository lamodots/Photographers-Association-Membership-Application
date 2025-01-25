const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const fileUpload = require("express-fileupload");
const {
  notfoundHandlerMiddleware,
  errorHandlerMiddleware,
} = require("./middlewares");
const {
  adminAuthRoutes,
  appSettingsRoutes,
  announcementsRoutes,
  subscriptionsRoutes,
  eventRoutes,
  adminUserRoute,
} = require("./routes");

app.disable("etag");
const corsOptions = { origin: "http://localhost:3000", credentials: true };
//Import exprss middlewares
app.use(cors(corsOptions));
app.use(
  express.static(
    path.join(__dirname, "..", "..", "..", "..", "client", "public", "uploads")
  )
);

app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.JWT_SECRET));

// app.get("/", (req, res) => {
//   res.send({ message: "Welcome to the MembershipCMS backend API" });
// });
app.use("/api/v1/secure/auth", adminAuthRoutes);
app.use("/api/v1/secure/profile", adminUserRoute);
app.use("/api/v1/secure/settings", appSettingsRoutes);
app.use("/api/v1/secure/announcement", announcementsRoutes);
app.use("/api/v1/secure/subscriptions", subscriptionsRoutes);
app.use("/api/v1/secure/events", eventRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "client/build")));
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "client", "public", "uploads"))
  );

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client/build/index.html"))
  );
} else {
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "client", "public", "uploads"))
  );
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to the MembershipCMS backend API" });
  });
}
app.use(notfoundHandlerMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
