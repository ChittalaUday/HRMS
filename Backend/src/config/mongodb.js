const mongoose = require("mongoose");

const connectMongoDB = async () => {
  const mongodbURL = "mongodb://localhost:27017/";
  try {
    await mongoose.connect(mongodbURL);
    console.log("MongoDB Connected successfully!");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
