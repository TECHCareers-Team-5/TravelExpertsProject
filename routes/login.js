var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const { Customer } = require("../models/customerRegister");

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.render("login", { title: "Login" });
});

router.get("/signup", (req, res, next) => {
  res.render("loginsignup", { title: "Sign Up" });
});

router.post("/signup", (req, res, next) => {
  console.log("signup endpoint");
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) throw err;
    // Replace the plain password with the hashed password
    req.body.password = hashedPassword;
    const newCustomer = new Customer(req.body);
    newCustomer.save((err, result) => {
      if (err) {
        const errorArray = [];
        const errorKeys = Object.keys(err.errors);
        errorKeys.forEach((key) => errorArray.push(err.errors[key].message));
        return res.render("loginsignup", {
          errors: errorArray,
        });
      }
      console.log(result);
      res.render("login", {
        fname: result.CustFirstName,
        lname: result.CustLastName,
        msg: "Welcome:",
        msg2: "Please login with your credentials",
      });
    });
  });
});

module.exports = router;
