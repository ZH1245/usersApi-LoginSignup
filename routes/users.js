var express = require("express");
var router = express.Router();
const userModel = require("../model/usermodel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// let user1 = userModel();
// user1.name = "Zain Haroon";
// user1.email = "zainharoon890@gmail.com";
// user1.password = "zain.0905";
// user1.password = await bcrypt.hash(user1.password, salt);

// user1.save();
/* GET users listing. */
// router.get("/", function (req, res, next) {});

router.post("/register", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  console.log(user);
  if (user) return res.status(400).send("ALREADY EXISTS");
  else {
    let newUser = userModel();
    newUser.email = req.body.email;
    newUser.name = req.body.name;
    newUser.password = req.body.password;
    let salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(req.body.password, salt);
    await newUser.save();
    res.send("User Created");
  }
});
router.get("/", (req, resp) => {
  let users = userModel.find({}, (error, result) => {
    if (error) {
      return resp.status(404).send("Product not found");
    } else {
      if (result.length) return resp.send(result);
      else return resp.status(404).send("Product not found");
    }
    s;
  });
});

router.get("/:id", async (req, resp) => {
  let user = await userModel.findById(req.params.id);
  if (user) {
    return resp.send(user);
  } else resp.status(404).send("Not Found");
});

// router.get("/:email", async (req, resp) => {
//   let user = await userModel.findOne({ email: req.params.email });
//   if (user) {
//     return resp.send(user);
//   } else resp.status(404).send("Not Found");
// });
module.exports = router;
