import connectDB from "./config/db";
import authRoutes from "./routes/auth.route";
import cors from "cors";
import cookieParser from 'cookie-parser';

import express from "express";
import env from "./env";

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
app.use(cookieParser())
app.use(express.json());
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Connected to server on PORT ${PORT}`);
  connectDB();
});
