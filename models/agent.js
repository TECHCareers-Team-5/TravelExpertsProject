// Author - Ping
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const agentSchema = new mongoose.Schema({
  AgentId: {
    type: Number,
    required: "ID is required",
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
