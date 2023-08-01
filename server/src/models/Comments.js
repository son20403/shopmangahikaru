import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Comments = new Schema(
  {
    customerId: { type: String },
    productId: { type: String },
    content: { type: String },
    dateComment: { type: String },
    rating: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comments", Comments);
