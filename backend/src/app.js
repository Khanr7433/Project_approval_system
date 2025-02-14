import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim()) || "*",
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// import routes
import studentRoutes from "./routes/student.routes.js";
import facultyRoutes from "./routes/faculty.routes.js";
import projectRoutes from "./routes/project.routes.js";
import adminRoutes from "./routes/admin.routes.js";

// routes declaration
app.get("/", (req, res) => {
  res.send("Hello this is home route");
});
app.use("/students", studentRoutes);
app.use("/faculties", facultyRoutes);
app.use("/projects", projectRoutes);
app.use("/admin", adminRoutes);

export default app;
