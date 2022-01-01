const errorHandler = require("../handlers/errorHandlers");
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { USER_SCHEMAS } = require("../validations/user");
const isAuth = require("../middleware/isAuth");
const { userMulter } = require("../multer/userMulter");
router.post(
  "/",
  userMulter.single("proPic"),
  USER_SCHEMAS.USER_REGISTER,
  errorHandler.catchErrors(userController.register)
);
router.post(
  "/login",
  USER_SCHEMAS.USER_LOCGIN,
  errorHandler.catchErrors(userController.login)
);

module.exports = router;
