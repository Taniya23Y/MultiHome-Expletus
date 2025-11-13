const mongoose = require("mongoose");
// const MONGO_URI = process.env.MONGODB_URI;

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI, {
      // const connect = await mongoose.connect(process.env.MONGODB_URI_TESTING, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = dbConnect;
