const User = require("../models/User");
const dotenv = require("dotenv").config();
const jwt = require("jwt-then");
const sha256 = require("sha256");
const { welcomeMail } = require("../services/dynamicMailer.js");
const { default: Container } = require("typedi");

exports.login = async (req, res) => {
  try {
    res.json({
      status: 200,
      message: "test is there",
    });
  } catch (error) {
    throw "Something Went Wrong";
  }
};

// register
exports.register = async (req, res) => {
  try {
    const data = req.body;
    // const file = req["file"];
    // if (!file) {
    //   throw "Profile Image is Required";
    // }
    let userExists = await User.findOne({ email: data["email"] });
    if (userExists) {
      throw "User already Exists with this email";
    }
    let password = sha256(data["password"] + dotenv.parsed.SALT);
    data["password"] = password;
    let saveUser = new User(data);
    await saveUser.save();

    /**
     * Mail send
     */
    const sendMail = {
      receiver_email: saveUser.email,
      name: saveUser.name,
    };
    await welcomeMail(sendMail);

    const token = await this.UserTokenGenerate(saveUser);
    res.json({
      status: 200,
      message: "You are successfully registered",
      data: token,
    });
  } catch (error) {
    console.log(error, "error");
    throw error;
  }
};

// generate token
exports.UserTokenGenerate = (userData) => {
  try {
    const data = jwt.sign({ _id: userData["_id"] }, dotenv.parsed.JWT_SECRET, {
      expiresIn: "200h",
    });
    return data;
  } catch (error) {
    throw error;
  }
};
