import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),
  DATABASE_URI: Joi.string().required(),
  AGENT_SERVICE: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().required(),
  KAFKA_BROKERS: Joi.string().required(),
  KAFKA_CONSUMER_GROUP: Joi.string().required(),
});
