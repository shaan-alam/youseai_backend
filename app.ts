import connectDB from "./config/db";
import cors from "cors";
import cookieParser from "cookie-parser";

import express from "express";
import env from "./env";

import authRoutes from "./routes/auth.route";
import taskRoutes from "./routes/task.route";

const app = express();
const PORT = env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/task", taskRoutes);

app.listen(PORT, () => {
  console.log(`Connected to server on PORT ${PORT}`);
  connectDB();
});
