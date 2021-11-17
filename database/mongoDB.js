const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

function myDB() {
  let project_database;
  let username_global;

  const myDB = {};

  // MongoDB Connection URI
  // MAKE SURE TO DELETE CONNECTION STRING UPON COMPLETION
  const uri =
    "mongodb+srv://admin:n6KP16laOm9YkgRL@cs5610project3.kwjri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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

  myDB.insert_post = async (req_json, res) => {
    const feedback_database = project_database.collection("posts");
    req_json["username"] = username_global;
    await feedback_database.insertOne(req_json);
    console.log("Post Successfully Submitted!");
  };

  myDB.create_account = async (username, password, res) => {
    const collection_info = project_database.collection("username_password");
    const query = {
      username: username,
    };
    const execute = await collection_info.findOne(query);

    if (execute != null) {
      // res.redirect("/account-already-exists");
      res.json({ status: "account-exists" });
    } else {
      myDB
        .insert_username_password(username, password, collection_info)
        .catch(console.dir);
      username_global = username;
      res.json({ status: "success" });
      // res.redirect("/login");
    }
  };

  myDB.edit_feedback = async (originalId, editedText, editedSubject) => {
    const feedback_database = project_database.collection("Feedback Box");
    const query = { _id: ObjectId(originalId) };
    const updateDoc = {
      $set: {
        comment: editedText,
        subject: editedSubject,
      },
    };
    // const execute = await feedback_database.updateOne(query, updateDoc);
    await feedback_database.updateOne(query, updateDoc);
    console.log("Comment successfully edited!");
    //Attempt to reload comments.
    myDB.getComments().catch(console.dir);
  };

  myDB.delete_feedback = async (originalId) => {
    const feedback_database = project_database.collection("Feedback Box");
    const query = { _id: ObjectId(originalId) };
    console.log(query);
    await feedback_database.deleteOne(query);
    console.log("Entry successfully deleted!");
    //Attempt to reload comments.
    myDB.getComments().catch(console.dir);
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

  myDB.process_username_password_input = async (username, password, res) => {
    const collection_info = project_database.collection("username_password");
    const query = {
      username: username,
    };
    const execute = await collection_info.findOne(query);
    if (execute == null) {
      res.json({ status: false });
    } else {
      if (password == execute.password) {
        username_global = username;
        res.json({ status: true });
      } else {
        res.json({ status: false });
      }
    }
  };

  myDB.getComments = async (res) => {
    console.log("Reload comment has been executed.");
    let query2;
    console.log("Global username:", username_global);
    if (username_global === "admin@admin") {
      query2 = {};
    } else {
      query2 = { username: username_global };
    }
    const comment_db = project_database.collection("posts");
    const result = await comment_db.find(query2).toArray();
    console.log(result);
    res.send(result);
    return result;
  };

  //get all the posts in the database.
  myDB.getAllPosts = async (res) => {
    console.log("Loading all posts from database.");
    const post_db = project_database.collection("posts");
    let find_all = {};
    let result = await post_db.find(find_all).toArray();
    res.json(result);
    return result;
  };

  //get counts from certain collections
  myDB.getCounts = async (col_name) => {
    const performance_db = project_database.collection(col_name);
    return await performance_db.count();
  };

  return myDB;
}

module.exports = myDB();
