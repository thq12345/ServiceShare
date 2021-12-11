//Back end
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const indexRouter = require("./routes/index.js");
const auth = require("./configuration/passportconfig.js");
const passport = require("passport");
auth.setupPassport();

const port = process.env.PORT || 5000;
const app = express();
//Connection test
app.listen(port, () => {
  console.log(`Project running at ${port}`);
});

app.set("view engine", "html");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "frontend/build")));
//passport stuff
app.use(
  require("express-session")({
    secret: "secretkeyyy",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
//
// app.use(function (req, res, next) {
//   let msg = req.session.messages || [];
//   res.locals.messages = msg;
//   console.log("Session message", msg);
//   res.locals.hasMessages = !!msg.length;
//   req.session.messages = [];
//   next();
// });

app.use(passport.session());

app.get("/loginStatus", (req, res) => {
  res.json({ user: req.user });
});

app.get("/logout", function (req, res) {
  req.logout();
  console.log("Current log in user is", req.user);
  res.json({ status: true });
});

app.use("/api", indexRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
});

module.exports = app;
