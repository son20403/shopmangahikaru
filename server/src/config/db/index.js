import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/nodejs_dev");
    console.log("Connect Database Successfully!!!");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
//mongodb://127.0.0.1/nodejs_dev
//mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@nodejs.ac2mcxh.mongodb.net/?retryWrites=true&w=majority
module.exports = { connect };
