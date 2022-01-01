const mongoose = require("mongoose");

const TipSchema = mongoose.Schema(
  {
    place: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    tipPercentage: {
      type: Number,
      required: true,
    },
    tip: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tip", TipSchema);
