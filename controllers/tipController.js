const Tip = require("../models/Tip");
const moment = require("moment");
const { default: Container } = require("typedi");
const { create } = require("../models/Tip");
const e = require("express");

// calculate tip
exports.calculateTip = async (req, res) => {
  try {
    const loggedUser = Container.get("auth-token");
    const data = req.body;
    /**
     * CalculatE THE TIP
     */
    let tip = (data["tipPercentage"] / 100) * data["totalAmount"];
    data["tip"] = tip;
    let date = moment().format("YYYY-MM-DD");
    data["date"] = date;
    data["user_id"] = loggedUser["id"];
    const createTip = new Tip(data);
    await createTip.save();
    res.json({
      status: 200,
      message: "Tip Created Successfully",
      tip: tip,
    });
  } catch (error) {
    throw error;
  }
};

// get tip
exports.getTip = async (req, res) => {
  try {
    const loggedUser = Container.get("auth-token");
    const query = req.query;
    /**
     * CalculatE THE TIP
     */
    let where = {
      user_id: loggedUser["user_id"],
    };
    if (query["startDate"] && query["endDate"]) {
      where = {
        user_id: loggedUser["user_id"],
        date: {
          $gte: query["startDate"],
          $lte: query["endDate"],
        },
      };
    }
    let tip = await Tip.find(where, {
      _id: 0,
      spentAt: "$place",
      tipPercentage: 1,
      tipAmount: "$tip",
      totalAmount: 1,
    }).exec();
    const arr = await tip.map((x) =>
      query["AnalyticsType"] == "tipPercentage" ? x.tipPercentage : x.place
    );
    const toFindDuplicates = (arry) =>
      arry.filter((item, index) => arr.indexOf(item) !== index);
    const duplicateElementa = toFindDuplicates(arr);
    console.log(duplicateElementa);
    if (duplicateElementa.length == 0) {
      res.json({
        status: 400,
        message:
          query["AnalyticsType"] == "tipPercentage"
            ? "No most used percentage in list"
            : "No most visited places",
      });
    } else {
      const result = Object.entries(
        duplicateElementa.reduce((previous, current) => {
          if (previous[current] === undefined) previous[current] = 1;
          else previous[current]++;
          return previous;
        }, {})
      ).reduce((previous, current) =>
        current[1] >= previous[1] ? current : previous
      )[0];
      let finalResult;
      if (query["AnalyticsType"] == "tipPercentage") {
        finalResult = {
          tipPercentage: result,
          noOfTimes: duplicateElementa.filter((x) => x == result).length,
        };
      } else {
        finalResult = {
          place: result,
          noOfTimes: duplicateElementa.filter((x) => x == result).length,
        };
      }
      res.json({
        status: 200,
        data: finalResult,
      });
    }
    res.json({
      status: 200,
      message: "Success",
      data: tip,
    });
  } catch (error) {
    throw error;
  }
};
