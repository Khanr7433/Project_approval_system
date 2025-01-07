import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const DB = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.DB_NAME}`
    );
    console.log("MongoDB connected successfully : ", DB.connection.name);
  } catch (err) {
    console.log("MongoDB connection failed ", err);
  }
};

export default connectDB;
