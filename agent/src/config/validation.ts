import * as Joi from 'joi';

export const validationSchema = Joi.object({
  AGENT_ID: Joi.string().required(),
  PORT: Joi.number().required(),
});
