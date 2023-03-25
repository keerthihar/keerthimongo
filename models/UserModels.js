const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});
 
const model = mongoose.model("User", userSchema);

model.createIndexes();

module.exports = model;
