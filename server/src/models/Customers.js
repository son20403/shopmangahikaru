import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Customer = new Schema(
  {
    name: { type: String },
    user_name: { type: String },
    image: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/1/1247.png",
    },
    idImage: { type: String, default: "" },
    password: { type: String },
    email: { type: String },
    admin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", Customer);
