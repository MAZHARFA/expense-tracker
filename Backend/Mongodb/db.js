"use strict";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Mongodb connected:${conn.connection.host}`);
  } catch (error) {
    console.log("Error connected to Mongodb:", error.message);
    process.exit(1);
  }
};

export default connectDB;
