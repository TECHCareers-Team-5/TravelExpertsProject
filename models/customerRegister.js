// Author - Grant van Boeschoten
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const mongoDB =
  "mongodb+srv://team5access:mostafa@cluster0.wspcn.mongodb.net/TravelExperts?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

/// To log the Mongoose erros to the console directly

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Mongoose is connected to the TravelExperts Database");
});

const customersSchema = new mongoose.Schema({
  CustomerId: {
    type: Number,
  },

  CustFirstName: {
    type: String,
    required: "First name is required",
    trim: true,
  },

  CustLastName: {
    type: String,
    required: "Last name is required",
    trim: true,
  },

  CustAddress: {
    type: String,
    trim: true,
  },

  CustCity: {
    type: String,
    trim: true,
  },

  CustProv: {
    type: String,
    trim: true,
  },

  CustPostal: {
    type: String,
    trim: true,
  },

  CustHomePhone: {
    type: String,
    required: "Primary phone is required",
    trim: true,
  },

  CustBusPhone: {
    type: String,
    trim: true,
  },

  CustEmail: {
    type: String,
    required: "Email Address",
    trim: true,
    validate: {
      validator: function (v) {
        return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(v);
      },
      message: (props) => `${props.value} is not a valid Email address.`,
    },
  },
  password: {
    type: String,
    required: "Password is Required",
    trim: true,
  },

  AgentId: {
    type: Number,
  },
});

// create a model Customers useing customersSchema
module.exports.Customer = mongoose.model("Customer", customersSchema);
