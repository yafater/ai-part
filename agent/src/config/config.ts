export default () => ({
  agent: {
    id: process.env.AGENT_ID,
  },
  port: process.env.PORT,
  kafka: {
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: process.env.KAFKA_BROKERS,
    consumerGroup: process.env.KAFKA_CONSUMER_GROUP,
  },
});
