const mongoose = require("mongoose");
require("dotenv").config();
const uri =
  "mongodb+srv://ahpyae:ahpyae123@kaven.vvxwuen.mongodb.net/rental?retryWrites=true&w=majority";

// Optional: Set Mongoose options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to MongoDB Atlas using Mongoose
const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB Atlas with Mongoose!");
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas with Mongoose:", err);
  }
};

module.exports = connectToDatabase;
