import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Books = new Schema(
  {
    title: { type: String },
    author: { type: String },
    image: { type: String },
    idImage: { type: String },
    description: { type: String },
    year: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    review_count: { type: Number, default: 0 },
    average_score: { type: Number, default: 0 },
    favourite: { type: Number, default: 0 },
    idStaf: { type: String, default: "" },
    category: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Books", Books);
