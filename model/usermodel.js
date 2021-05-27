const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Model = mongoose.model("UserApi", Schema);
module.exports = Model;
