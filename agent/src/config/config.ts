export default () => ({
  agent: {
    service: process.env.AGENT_ID,
  },
  port: process.env.PORT,
  socket_port: process.env.SOCKET_PORT,
});
