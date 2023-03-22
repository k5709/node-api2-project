// implement your server here
// require your posts router and connect it here
const express = require("express");

const server = express();

server.use(express.json());

server.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

const port = 9000;

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
module.exports = server;
