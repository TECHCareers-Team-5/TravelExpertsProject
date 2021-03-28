const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const loginRouter = require("./routes/login");
var session = require("express-session");
var bodyParser = require("body-parser");

module.exports.init = function (app) {
  // app.use(
  //   require("express-session")({       commented out to try demo from passport docs
  //     secret: "k33pITs3cret",          http://www.passportjs.org/docs/
  //     resave: true,
  //     saveUninitialized: true,
  //   })
  // );
  app.use(express.static("public"));
  app.use(session({ secret: "k33pITs3cret" }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(passport.session());

  // require Customer Schema
  const { Customer } = require("./models/customerRegister");
  const { Passport } = require("passport");
  const bcrypt = require("bcryptjs");

  //give access to login router GV
  loginRouter.passport = passport;

  //Passport local strategy    COMMENTED OUT to try example from passport.js docs
  // passport.use(
  //   new LocalStrategy(function (username, password, done) {
  //     Customer.findOne({ UserName: username }, function (err, user) {
  //       if (err) {
  //         console.log("error from app.js 52");
  //         return done(err);
  //       }
  //       if (!user) {
  //         console.log("no user account");
  //         return done(null, false);
  //       }
  //       bcrypt.compare(password, user.password, (err, res) => {
  //         if (res) {
  //           // successful login
  //           console.log("succesful login");

  //           return done(null, user);
  //         } else {
  //           console.log("passwords dont match");
  //           // passwords don't match
  //           return done(null, false, { msg: "Incorrect password" });
  //         }
  //       });
  //     });
  //   })
  // );

  passport.use(
    new LocalStrategy(function (username, password, done) {
      Customer.findOne({ username: username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    Customer.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // app.post(
  //   "/login",
  //   passport.authenticate("local", { failureRedirect: "/login" }),
  // function (req, res) {
  //   const headermsg = `Welcome ${Customer.CustFirstName} ${Customer.CustLastName}.
  //     You are now logged in.`;
  //   res.redirect("/?headermsg=" + headermsg);
  // }
  // );

  app.use(passport.initialize());
  app.use(passport.session());
};

//code I might need later
// const headermsg = `Welcome ${Customer.CustFirstName} ${Customer.CustLastName}.
//         You are now logged in.`
