const passport = require("passport");
const { Strategy } = require("passport-local");
// -----Another way to import rather than destructuring----
// const MyStrategy=require('passport-local').Strategy;

const User = require("../models/User");
const bcrypt = require("bcrypt");

passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, {
          message: "User or password is not correct!",
        });
      }
      const isPassMatch = await bcrypt.compare(password, user.password);
      if (isPassMatch) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: "email or password is not correct!",
        });
      }
    } catch (error) {
      console.log(err);
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
