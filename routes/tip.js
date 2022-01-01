const errorHandler = require("../handlers/errorHandlers");
const express = require("express");
const router = express.Router();
const tipController = require("../controllers/tipController");
const { TIP_SCHEMAS } = require("../validations/tip");
const isAuth = require("../middleware/isAuth");
router.post(
  "/calculate",
  isAuth,
  TIP_SCHEMAS.CALCULATE_TIP,
  errorHandler.catchErrors(tipController.calculateTip)
);
router.get("/", isAuth, errorHandler.catchErrors(tipController.getTip));

module.exports = router;
