const { findOne } = require("../models/UserModels");
const service = require("../functions/UserFunctions");
const bcrypt = require ('bcrypt');
const saltRounds = 10;

var emailVal = /^\w+([\.-]?\w+)*@(northeastern.edu)$/;
var nameVal =  /^[a-zA-Z]+ [a-zA-Z]+$/;
var passVal = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/;
 
exports.getAllUsers = async (req, res) => {
  try {
    const userDetails = await service.getAllUsers();
    res.json({ data: userDetails, status: "Fetched all the available records" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.createUser = async (req, res) => {
  try {
    if(!(nameVal.test(req.body.name) || (req.body.name==null)))
    {
      throw new Error("Enter a valid Name");
    }
    if(!(emailVal.test(req.body.email) || (req.body.email)==null))
    {
      throw new Error("Only northeastern mail Ids are accepted");
    }
    if(!(passVal.test(req.body.password) || (req.body.password)==null))
    {
      throw new Error("Password must have atleast one capital letter, a number and a special character and should have a minimum of 12 characters");
    }
    const hashVal = await new Promise((resolve, reject) =>{ 
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        console.log(err);
        if(err)
        reject(err)
      resolve(hash);
      });
    });
    // const hashval = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
    req.body.password = hashVal;
    const userDet = await service.createUser(req.body);
    res.json({ data: userDet, status: "New user " + req.body.name + " added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.editUser = async (req, res) => {
  try {
    const hashVal = await new Promise((resolve, reject) =>{ 
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if(err)
        reject(err)
      resolve(hash);
      });
    });
    req.body.password = hashVal;
    const userDet = await service.editUser(req.body.email, req.body);
    if(userDet == null)
    {
      throw new Error ("User does not exist" );
    }
    if(!(nameVal.test(req.body.name) || (req.body.name==null)))
    {
      throw new Error("Enter a valid Name");
    }
    if(!(passVal.test(req.body.password) || (req.body.password)==null))
    {
      throw new Error("Password must have atleast one capital letter, a number and a special character and should have a minimum of 8 characters");
    }
    res.json({ status: "User details of " + req.body.email + " updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.deleteUser = async (req, res) => {
  try {
    const userDet = await service.deleteUser(req.body.email);
    res.json({ data: userDet, status: "User " + userDet.name + " deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAllUsers = async (req, res) => {
  try {
    const userDet = await service.deleteAllUsers();
    res.json({ data: userDet, status: "All Items Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};