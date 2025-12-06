import * as Joi from 'joi';

export const validationSchema = Joi.object({
  AGENT_ID: Joi.string().required(),
  PORT: Joi.number().required(),
  KAFKA_BROKERS: Joi.string().required(),
  KAFKA_CLIENT_ID: Joi.string().required(),
  KAFKA_CONSUMER_GROUP: Joi.string().required(),
});
