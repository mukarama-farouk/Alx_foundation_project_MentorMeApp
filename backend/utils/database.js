require('dotenv').config();
const mongoose = require('mongoose');

exports.connectDb = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        // useNewUrlParser: true,
      });
      console.log("connected to mongoDb");
    } catch (e) {
      console.log(e);
    }
  };
