export default () => ({
  database: {
    uri: process.env.DATABASE_URI!,
  },
  port: process.env.PORT!,
  agent: {
    service: process.env.AGENT_SERVICE!,
  },
});
