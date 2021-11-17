const express = require("express");
const router = express.Router();
const myDB = require("../database/mongoDB.js");

//establish connection with cloud database
myDB.establishConnection().catch(console.dir);

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

//Working example.
router.post("/register", async (req, res) => {
  console.log("Received user-input account information...");
  // Insert Login Code Here
  const username = req.body.username;
  const password = req.body.password;
  await myDB.create_account(username, password, res).catch(console.dir);
});

router.post("/login-auth", async (req, res) => {
  console.log("Received user-input account information...");
  // Insert Login Code Here
  const username = req.body.username;
  const password = req.body.password;
  await myDB
    .process_username_password_input(username, password, res)
    .catch(console.dir);
});

//Load all posts for index page regardless of username. (Useful for index page)
router.get("/load-all-post", async (req, res) => {
  console.log("Retrieving all posts from back end databases... (Backend)");
  await myDB.getAllPosts(res).catch(console.dir);
});

router.post("/submit-form", async (req, res) => {
  console.log("Received user-submitted form!");
  await myDB.insert_post(req.body, res).catch(console.dir);
});

router.get("/load-user-posts", async (req, res) => {
  console.log("Loading logged in user's posts...");
  await myDB.getComments(res).catch(console.dir);
});

module.exports = router;
