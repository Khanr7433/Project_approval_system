import express from "express";

const app = express();

app.use(express.json({ limit: "16kb" }));

// import routes
import userRoutes from "./routes/user.routes.js";

// routes declaration
app.get("/", (req, res) => {
  res.send("Hello this is home route");
});
app.use("/users", userRoutes);

export default app;
