var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const { Agent } = require("../models/agent");
const passport = require("passport");
const local = require("passport-local");
const { Customer } = require("../models/customerRegister");

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.render("agent", { title: "Travel Expert | Agent Login" });
});

router.post(
  "/login",
  passport.authenticate("agent", {
    successRedirect: "/agent/agentdashboard",
    failureRedirect: "/agent",
  })
);

router.get("/agentdashboard", (req, res, next) => {
  res.render("agentdashboard", { title: "Travel Expert | Agent Dashboard" });
});

router.post("/search", (req, res, next) => {
  const lname = req.body.CustLastName;
  const query = { CustLastName: lname };
  console.log(query);
  console.log(lname);
  Customer.findOne(query, (err, result) => {
    if (err) {
      console.log(err);
      next(err);
    }
    res.render("agentresult", { result });
  });
});

router.post("/commission", (req, res, next) => {
  const agentId = req.body.AgentId;
  const query = { AgentId: agentId };
  console.log(query);
  console.log(agentId);
  Agent.findOne(query, (err, commission) => {
    if (err) {
      console.log(err);
      next(err);
    }
    res.render("agentresult", { commission });
    console.log(commission.Commission);
  });
});
// from passportjs.org

// router.get("/signup", (req, res, next) => {
//   res.render("loginsignup", { title: "Sign Up" });
// });

// router.post("/signup", (req, res, next) => {
//   console.log("signup endpoint");
//   bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
//     if (err) throw err;
//     // Replace the plain password with the hashed password
//     req.body.password = hashedPassword;
//     const newCustomer = new Customer(req.body);
//     newCustomer.save((err, result) => {
//       if (err) {
//         const errorArray = [];
//         const errorKeys = Object.keys(err.errors);
//         errorKeys.forEach((key) => errorArray.push(err.errors[key].message));
//         return res.render("loginsignup", {
//           errors: errorArray,
//           CustFirstName: req.body.CustFirstName,
//           CustLastName: req.body.CustLastName,
//           CustAddress: req.body.CustAddress,
//           CustCity: req.body.CustCity,
//           CustProv: req.body.CustProv,
//           CustPostal: req.body.CustPostal,
//           CustHomePhone: req.body.CustHomePhone,
//           CustBusPhone: req.body.CustBusPhone,
//           CustEmail: req.body.CustEmail,
//           AgentId: req.body.AgentId,
//         });
//       }
//       // Welcome message for succesful account creation GV
//       console.log(result);
// res.render("/", {
//   fname: result.CustFirstName,
//   lname: result.CustLastName,
//         msg: "Welcome ",
//         msg2: ", Please login with your credentials",
//       });
//     });
//   });
// });

module.exports = router;
