import Joi from "joi";

export const addUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  dob: Joi.date().required(),
});
export const editUserSchema = Joi.object({
  id: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  dob: Joi.date().required(),
});
export const deleteUserSchema = Joi.object({
  id: Joi.string().required(),
});
