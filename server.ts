import express from "express";

async function startServer() {
  const app = express();
  app.listen(8990);
  console.log("Server running on port 8990");
}

startServer();
