import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Categories = new Schema(
  {
    name: { type: String },
    image: { type: String },
    idImage: { type: String },
    idStaf: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Categories", Categories);
