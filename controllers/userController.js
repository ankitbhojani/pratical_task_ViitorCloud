const User = require("../models/User");
const dotenv = require("dotenv").config();
const jwt = require("jwt-then");
const sha256 = require("sha256");
const { welcomeMail } = require("../services/dynamicMailer.js");
const { default: Container } = require("typedi");

exports.login = async (req, res) => {
  try {
    const data = req.body;
    let userExists = await User.findOne({ email: data["email"] });
    if (!userExists) {
      throw "User doesn't Exists with this email";
    }
    let password = sha256(data["password"] + dotenv.parsed.SALT);
    if (password != userExists.password) {
      res.status(401).json({
        status: 401,
        message: "Invalid Credencials",
      });
    }
    const token = await this.UserTokenGenerate(userExists);
    res.json({
      status: 201,
      name: userExists.name,
      message: "Successfully Login",
      token: token,
    });
  } catch (error) {
    throw error;
  }
};

// register
exports.register = async (req, res) => {
  try {
    const data = req.body;
    const file = req["file"];
    if (!file) {
      throw "Profile Image is Required";
    }
    let userExists = await User.findOne({ email: data["email"] });
    if (userExists) {
      throw "User already Exists with this email";
    }
    let password = sha256(data["password"] + dotenv.parsed.SALT);
    data["password"] = password;
    data["profile_image"] = file["filename"];
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
      status: 201,
      message: "You are successfully registered",
      token: token,
      name: data["name"],
    });
  } catch (error) {
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
