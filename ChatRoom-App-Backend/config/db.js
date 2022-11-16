const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect("mongodb+srv://admin:anas12345@chatroomapp.yvpkfvj.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`mongodb connected:${conn.connection.host}`);
};

module.exports = connectDB;