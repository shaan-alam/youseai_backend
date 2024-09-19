import connectDB from "./config/db";
import authRoutes from "./routes/auth.route";

import express from "express";
import env from "./env";

const app = express();
const PORT = env.PORT || 5000;

app.use(express.json());
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Connected to server on PORT ${PORT}`);
  connectDB();
});
