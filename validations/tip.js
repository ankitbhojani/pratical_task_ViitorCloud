const { Joi, celebrate } = require("celebrate");
const TIP_SCHEMAS = {
  CALCULATE_TIP: celebrate({
    body: Joi.object({
      place: Joi.string().min(2).max(20).required(),
      totalAmount: Joi.number().min(1).required(),
      tipPercentage: Joi.number().required(),
    }),
  }),
};
module.exports = { TIP_SCHEMAS };
