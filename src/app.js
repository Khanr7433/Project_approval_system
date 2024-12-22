import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// import routes
import userRoutes from "./routes/user.routes.js";

// routes declaration
app.get("/", (req, res) => {
  res.send("Hello this is home route");
});
app.use("/users", userRoutes);

export default app;
