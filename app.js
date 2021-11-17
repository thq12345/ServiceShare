//Back end
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const indexRouter = require("./routes/index.js");

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
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);

module.exports = app;
