var createError = require("http-errors");
const express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const pug = require("pug");
const app = express();

// -------------------------------------------------------------
// For Passport.js
require("./my-passport").init(app);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const registerRouter = require("./routes/register");
const packagesRouter = require("./routes/packages");
const agentRouter = require("./routes/agentrouter");
const suppliercontactsRouter = require("./routes/suppliercontacts");
const bookingsRouter = require("./routes/agents");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/register", registerRouter);
app.use("/packages", packagesRouter);
app.use("/agent", agentRouter);
app.use("/suppliercontacts", suppliercontactsRouter);
app.use("/bookings", bookingsRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handlern
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// const { User } = require("./models/users");  GV now using registerCustomer model and register router

// app.post("/register", (req, res) => {
//   console.log("Hello");

//   const user = new User(req.body);
//   console.log(user);
//   user.save((err) => {
//     if (err) throw err;
//     res.redirect("/thankyou");
//   });
// });

app.use((req, res, next) => {
  res.status(404).render("error");
});

module.exports = app;
