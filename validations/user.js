const { Joi, celebrate } = require("celebrate");
const USER_SCHEMAS = {
  USER_REGISTER: celebrate({
    body: Joi.object({
      name: Joi.string().min(2).max(20).required(),
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(6).max(15).required(),
    }),
  }),
  USER_LOCGIN: celebrate({
    body: Joi.object({
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(6).max(15).required(),
    }),
  }),
};
module.exports = { USER_SCHEMAS };
