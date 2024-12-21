import express from "express";
import userRoutes from "./routes/user.routes.js";

const app = express();

// routes
app.get("/", (req, res) => {
  res.send("Hello this is home route");
});
app.use("/users", userRoutes);

export default app;
