const express = require("express");
const router = express.Router();
const myDB = require("../database/mongoDB.js");

//establish connection with cloud database
myDB.establishConnection().catch(console.dir);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//Working example.
router.post("/register", async (req, res) => {
  console.log("Received user-input account information...");
  // Insert account Code Here
  const username = req.body.username;
  const password = req.body.password;
  console.log("Username: " + username);
  console.log("Password: " + password);
  await myDB.create_account(username, password, res).catch(console.dir);
  //dummy example testing out things
  // if (username != "abc@123.com" || password != "123456") {
  //   res.json({ status: true });
  // } else {
  //   res.json({ status: false });
  // }
});

router.post("/login-auth", async (req, res) => {
  console.log("Received user-input account information...");
  // Insert Login Code Here
  const username = req.body.username;
  const password = req.body.password;
  console.log("Username: " + username);
  console.log("Password: " + password);
  await myDB
    .process_username_password_input(username, password, res)
    .catch(console.dir);
});

module.exports = router;
