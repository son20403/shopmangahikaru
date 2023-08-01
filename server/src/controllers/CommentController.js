import Comments from "../models/Comments";
const _ = require("lodash");

class CommentController {
  // [POST]/customer/store
  async create(req, res) {
    const clientData = req.body;
    const customerId = req.customer.id;
    const dataComment = { ...clientData, customerId };
    try {
      const result = await Comments(dataComment).save();
      if (!result) {
        return res.status(400).json({
          message: "Comment ERROR!!!",
          status: false,
        });
      }
      return res.status(200).json({
        message: "Comment Success!!!",
        status: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  }
  // [GET]/comment
  async show(req, res) {
    try {
      const dataComment = await Comments.find({});
      if (!dataComment)
        return res.status(400).json({
          message: "Có lỗi xảy ra",
        });
      return res.status(200).json(dataComment);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  }
  // [GET]/comment/detail?id=
  async showById(req, res) {
    try {
      const id = req.query.id;
      const comments = await Comments.find({ productId: id });
      if (!comments) return res.status(400).json({ message: "Có lỗi xảy ra" });
      return res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({
        message: "SERVER ERROR!!!",
      });
    }
  }
}
module.exports = new CommentController();
