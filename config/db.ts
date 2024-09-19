import mongoose from "mongoose";
import env from "../env";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI || "");
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
