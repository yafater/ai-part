export default () => ({
  database: {
    uri: process.env.DATABASE_URI!,
  },
  redis: {
    host: process.env.REDIS_HOST!,
    port: process.env.REDIS_PORT!,
  },
  port: process.env.PORT!,
  agent: {
    service: process.env.AGENT_SERVICE!,
  },
});
