const express = require("express");
const app = express();
const cors = require("cors");
const user = require("./routes/user");
const tip = require("./routes/tip");
const mainHandler = require("./handlers/errorHandlers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/user", user);
app.use("/tip", tip);
app.use(mainHandler.celebrateErrors);
app.use(mainHandler.mongoseErrors);
app.use(mainHandler.notFound);
app.use(mainHandler.developmentErrors);

module.exports = app;
