import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("MongoDB connection failed ", err);
  }
};

export default connectDB;
