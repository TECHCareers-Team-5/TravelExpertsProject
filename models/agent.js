// Author - Ping
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

const agentSchema = new mongoose.Schema({
  AgentId: {
    type: Number,
    required: "ID is required",
    trim: true,
  },

  AgtMiddleInitial: {
    type: String,
    trim: true,
  },

  AgtFirstName: {
    type: String,
    required: "Last name is required",
    trim: true,
  },

  AgtLastName: {
    type: String,
    required: "Last name is required",
    trim: true,
  },

  AgtBusPhone: {
    type: String,
    trim: true,
  },

  AgtEmail: {
    type: String,
    trim: true,
  },

  AgtPosition: {
    type: String,
    trim: true,
  },

  AgencyId: {
    type: Number,
    trim: true,
  },

  AgtCommission: {
    type: Number,
    trim: true,
  },
});

// create a model Agents useing agentSchema
module.exports.Agent = mongoose.model("Agent", agentSchema);
