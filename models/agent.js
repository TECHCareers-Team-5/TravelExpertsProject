// Author - Ping, Grant (updated Schema)
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
  // AgentId: {
  //   type: String,
  //   trim: true,
  // },

  // AgtEmail: {
  //   type: String,
  //   trim: true,
  // },

  // password: {
  //   type: String,
  //   trim: true,
  // },
  AgentId: Number,
  AgtFirstName: String,
  AgtLastName: String,
  AgtBusPhone: String,
  AgtEmail: String,
  AgtPosition: String,
  AgencyId: String,
  password: String,
  Commission: Number,
});

// create a model Agents useing agentSchema
module.exports.Agent = mongoose.model("Agent", agentSchema);
