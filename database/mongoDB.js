const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

function myDB() {
  let project_database;
  // let username_global;

  const myDB = {};

  // MongoDB Connection URI
  // MAKE SURE TO DELETE CONNECTION STRING UPON COMPLETION
  const uri = process.env.MONGO_DB;

  myDB.establishConnection = async () => {
    const client = new MongoClient(uri);
    project_database = client.db("cs5610project3");
    try {
      // Connect the client to the server
      await client.connect();
      // Establish and verify connection
      await client.db("admin").command({ ping: 1 });
      console.log("Connected successfully to server");
    } catch (e) {
      console.log(e);
    }
  };

  myDB.insert_post = async (req, res) => {
    let feedback_database;
    // console.log("Inserting:::", req.body);
    if (req.body.Mode === "OfferHelp") {
      feedback_database = project_database.collection("helper");
    } else if (req.body.Mode === "SeekHelp") {
      feedback_database = project_database.collection("posts");
    }

    req.body["username"] = req.user;
    await feedback_database.insertOne(req.body);
    console.log("Post Successfully Submitted!");
    res.json({ status: true });
  };

  myDB.create_account = async (username, password, res) => {
    const collection_info = project_database.collection("username_password");
    const query = {
      username: username,
    };
    const execute = await collection_info.findOne(query);

    if (execute != null) {
      res.json({ status: "account-exists" });
    } else {
      myDB
        .insert_username_password(username, password, collection_info)
        .catch(console.dir);
      res.json({ status: "success" });
    }
  };

  myDB.edit_post = async (req, res) => {
    let target_database;
    let json = req.body;
    if (json.Mode === "SeekHelp") {
      target_database = project_database.collection("posts");
    } else if (json.Mode === "OfferHelp") {
      target_database = project_database.collection("helper");
    }
    const edit = {
      $set: {
        Description: json.Description,
        Category: json.Category,
        "Ideal Price": json["Ideal Price"],
        "Date for task": json["Date for task"],
        "Zip Code": json["Zip Code"],
        Address: json.Address,
        Longitude: json.Longitude,
        Latitude: json.Latitude,
      },
    };
    const query = { _id: ObjectId(json._id) };
    await target_database.updateOne(query, edit);
    console.log("Comment successfully edited!");
    //Attempt to reload comments.
    myDB.getComments(req, res).catch(console.dir);
  };

  myDB.delete_post = async (req, res) => {
    let target_database;
    let json = req.body;
    if (json.Mode === "SeekHelp") {
      target_database = project_database.collection("posts");
    } else if (json.Mode === "OfferHelp") {
      target_database = project_database.collection("helper");
    }

    const query = { _id: ObjectId(json._id) };
    await target_database.deleteOne(query);
    console.log("Entry successfully deleted!");
    //Attempt to reload comments.
    myDB.getComments(req, res).catch(console.dir);
  };

  myDB.insert_username_password = async (
    username,
    password,
    collection_info
  ) => {
    const write_info = {
      username: username,
      password: password,
    };
    await collection_info.insertOne(write_info);
    console.log("A Username Password Pair has been inserted successfully.");
  };

  // myDB.process_username_password_input = async (username, password, res) => {
  //   const collection_info = project_database.collection("username_password");
  //
  //   const query = {
  //     username: username,
  //   };
  //   const execute = await collection_info.findOne(query);
  //   if (execute == null) {
  //     res.json({ status: false });
  //   } else {
  //     if (password == execute.password) {
  //       username_global = username;
  //       res.json({ status: true });
  //     } else {
  //       res.json({ status: false });
  //     }
  //   }
  // };

  myDB.getComments = async (req, res) => {
    console.log("Reload comment has been executed.");
    let query2;
    if (req.user === "admin@admin") {
      query2 = {};
    } else {
      query2 = { username: req.user };
    }
    const helpSeeker_db = project_database.collection("posts");
    const result1 = await helpSeeker_db.find(query2).toArray();
    const helpOffer_db = project_database.collection("helper");
    const result2 = await helpOffer_db.find(query2).toArray();
    let result = await result1.concat(result2);
    res.send(result);
    return result;
  };

  //get all the offer help posts in the database.
  myDB.getAllHelpOfferPosts = async (bol, res) => {
    // console.log("Loading all posts from database.");
    // console.log(bol);
    const post_db = project_database.collection("helper");
    let result = await post_db.find({}).sort({ "Ideal Price": bol }).toArray();
    res.json(result);
    // console.log("loaded");
    result = result.slice(0, 250);
    return result;
  };

  //get all the seek help posts in the database.
  myDB.getAllSeekPosts = async (bol, res) => {
    // console.log("Loading all helper posts from database.");
    // console.log(bol);
    const post_db = project_database.collection("posts");
    let result = await post_db.find({}).sort({ "Ideal Price": bol }).toArray();
    res.json(result);
    result = result.slice(0, 250);
    return result;
  };

  //helper function for Passport.js doing authentication
  myDB.accessUserDataDB = async (username) => {
    const username_password = project_database.collection("username_password");
    let result = await username_password.findOne({ username: username });
    return result;
  };

  // myDB.setGlobalUser = async (username) => {
  //   username_global = username;
  // };

  myDB.addMessage = async (
    postid,
    senderUsername,
    receiverUsername,
    message,
    res
  ) => {
    const messagedb = project_database.collection("message");
    const write_info = {
      postid: postid,
      senderUsername: senderUsername,
      receiverUsername: receiverUsername,
      message: message,
    };
    await messagedb.insertOne(write_info);
    res.json({ status: true });
  };

  //User can only delete message they sent to others
  myDB.deleteMessage = async (messageid) => {
    const delete_info = { _id: messageid };
    const messagedb = project_database.collection("message");
    await messagedb.deleteOne(delete_info);
  };

  myDB.modifyMessage = async (messageid, modifiedMessage) => {
    const filter = { _id: ObjectId(messageid) };
    const update = { message: modifiedMessage };
    const messagedb = project_database.collection("message");
    await messagedb.updateOne(filter, update);
  };

  myDB.retrieveReceivedMessage = async (req, res) => {
    const filter = { receiverUsername: req.user };
    const messagedb = project_database.collection("message");
    const result = await messagedb.find(filter).toArray();
    res.json(result);
  };

  myDB.retrieveSentMessage = async (req, res) => {
    const filter = { senderUsername: req.user };
    const messagedb = project_database.collection("message");
    const result = await messagedb.find(filter).toArray();
    res.json(result);
  };

  myDB.getCurrentUser = async (req, res) => {
    res.json({ username: req.user });
  };

  return myDB;
}

module.exports = myDB();
