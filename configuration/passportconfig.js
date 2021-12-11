const passport = require("passport");
const LocalStrategy = require("passport-local");
const myDB = require("../database/mongoDB.js");

module.exports.setupPassport = () => {
  const Strategy = new LocalStrategy(async function (username, password, done) {
    const user = await myDB.accessUserDataDB(username);
    if (!user) {
      return done(null, false);
    }

    if (user.password === password) {
      // await myDB.setGlobalUser(user.username).catch(console.dir);
      return done(null, user);
    } else {
      return done(null, false);
    }
  });

  passport.use(Strategy);

  passport.serializeUser((user, done) => {
    console.log("serialize", user);
    // process.nextTick(function () {
    done(null, user.username);
    // });
  });

  passport.deserializeUser((user, done) => {
    console.log("deserialize", user);
    done(null, user);
  });
};
