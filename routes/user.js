const errorHandler = require("../handlers/errorHandlers");
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { USER_SCHEMAS } = require("../validations/user");
const isAuth = require("../middleware/isAuth");
router.post(
  "/register",
  USER_SCHEMAS.USER_LOGIN,
  errorHandler.catchErrors(userController.register)
);

module.exports = router;
