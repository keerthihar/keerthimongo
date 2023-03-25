const userModel = require("../models/UserModels");
 
exports.getAllUsers = async () => {
  return await userModel.find();
};
 
exports.createUser = async (userDet) => {
  return await userModel.create(userDet);
};
 
exports.editUser = async (email, body) => {
  return await userModel.findOneAndUpdate({email: email}, body);
};
 
exports.deleteUser = async (email) => {
  return await userModel.findOneAndDelete({email:email});
};

exports.deleteAllUsers = async () => {
  return await userModel.deleteMany();
};
