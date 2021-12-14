const express = require("express");
const router = express.Router();
const myDB = require("../database/mongoDB.js");
const passport = require("passport");

//establish connection with cloud database
myDB.establishConnection().catch(console.dir);

//Working example.
router.post("/register", async (req, res) => {
  // console.log("Received user-input account information...");
  // Insert Login Code Here
  const username = req.body.username;
  const password = req.body.password;
  await myDB.create_account(username, password, res).catch(console.dir);
});

router.post("/login-auth", function (req, res, next) {
  passport.authenticate("local", function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send({ status: false });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.send({ status: true });
    });
  })(req, res, next);
});

//Load all posts for index page regardless of username. (Useful for index page)
router.post("/load-all-helpers", async (req, res) => {
  // console.log("Retrieving all posts from back end databases... (Backend)");
  const bol = req.body.bol;
  await myDB.getAllHelpOfferPosts(bol, res).catch(console.dir);
});

router.post("/load-seeks", async (req, res) => {
  // console.log("Loading logged in helpers...");
  const bol = req.body.bol;
  await myDB.getAllSeekPosts(bol, res).catch(console.dir);
});

router.post("/submit-form", async (req, res) => {
  // console.log("Received user-submitted form!");
  await myDB.insert_post(req, res).catch(console.dir);
});

router.get("/load-user-posts", async (req, res) => {
  // console.log("Loading logged in user's posts...");
  await myDB.getComments(req, res).catch(console.dir);
});

router.post("/edit-post", async (req, res) => {
  // console.log("Editing post request submitted!");
  await myDB.edit_post(req, res).catch(console.dir);
});

router.post("/delete-post", async (req, res) => {
  // console.log("Deleting post request submitted!");
  await myDB.delete_post(req, res).catch(console.dir);
});

router.post("/submit-message", async (req, res) => {
  console.log("Submitting new message.");
  await myDB.addMessage(
    req.body.postid,
    req.body.senderUsername,
    req.body.receiverUsername,
    req.body.message,
    res
  );
});

//must be changed 6
router.get("/get-received-message", async (req, res) => {
  console.log("getting received messages...");
  await myDB.retrieveReceivedMessage(req, res);
});

module.exports = router;
