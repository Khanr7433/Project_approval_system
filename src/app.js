import express from "express";

const app = express();

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
