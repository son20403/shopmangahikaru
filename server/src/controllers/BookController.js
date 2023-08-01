import Books from "../models/Books";
import Comments from "../models/Comments";
const _ = require("lodash");
const cloudinary = require("cloudinary").v2;

class BookController {
    //[POST]/book/store
    async create(req, res) {
        const idStaf = req.customer.id;
        const formData = req.body;
        const { title } = formData;
        const fileData = req.file;
        const image = fileData.path;
        const idImage = fileData.filename;
        try {
            const isMatch = await Books.findOne({ title });
            if (isMatch) {
                if (fileData) cloudinary.uploader.destroy(idImage);
                return res.status(400).json({
                    message: "Tiêu đề đã tồn tại",
                });
            }
            const dataBook = await Books({
                ...formData,
                image,
                idImage,
                idStaf,
            }).save();
            if (dataBook) {
                return res.status(200).json({
                    message: "Thêm thành công",
                });
            } else {
                if (fileData) cloudinary.uploader.destroy(idImage);
                return res.status(401).json({
                    message: "Thêm thất bại",
                });
            }
        } catch (error) {
            cloudinary.uploader.destroy(idImage);
            console.log(error);
            return res.status(500).json({
                message: "Có lỗi xảy ra",
                error: error._message,
            });
        }
    }
    //[GET]/Books
    async show(req, res) {
        try {
            const dataBook = await Books.find({});
            if (!dataBook) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json(dataBook);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    }
    async showByCategory(req, res) {
        try {
            const idCate = req.query.id;
            const dataBook = await Books.find({ category: idCate });
            if (!dataBook) {
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            }
            return res.status(200).json(dataBook);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    }
    //[GET]/Books/detail?id=
    async detail(req, res) {
        try {
            const id = req.query.id;
            const dataBook = await Books.findById(id);
            if (!dataBook)
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            return res.status(200).json(dataBook);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    }

    //[PUT]/book/updateView?id=
    async update(req, res) {
        const idStaf = req.customer.id;
        const formData = req.body;
        const fileData = req.file;
        const id = req.query.id;
        let newImage;
        let newIdImage;
        if (fileData) {
            newImage = fileData.path;
            newIdImage = fileData.filename;
        }
        try {
            const oldBook = await Books.findOne({ _id: id });
            if (!oldBook) {
                if (fileData) cloudinary.uploader.destroy(newIdImage);
                return res.status(400).json({
                    message: "Không tồn tại sản phẩm này",
                });
            }
            if (fileData) cloudinary.uploader.destroy(oldBook.idImage);

            const dataBook = await Books.findByIdAndUpdate(
                id, { ...formData, image: newImage, idImage: newIdImage, idStaf }, {
                new: true,
            }
            );
            if (!dataBook) {
                if (fileData) cloudinary.uploader.destroy(newIdImage);
                return res.status(400).json({
                    message: "Có lỗi xảy ra, không thể update",
                });
            }
            return res.status(200).json({ dataBook, message: "Cập nhật thành công" });
        } catch (error) {
            if (fileData) cloudinary.uploader.destroy(newIdImage);
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    }
    async search(req, res) {
        try {
            const key = req.query.key;
            const $regex = _.escapeRegExp(key);
            const $options = _.escapeRegExp("i");
            const query = {
                $or: [
                    { title: { $regex, $options } },
                    { author: { $regex, $options } },
                ],
            };
            const dataBook = await Books.find(query);
            if (!dataBook)
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            return res.status(200).json(dataBook);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    }
    //[DELETE]/Books?id=
    async delete(req, res) {
        const id = req.query.id;
        try {
            const isComment = await Comments.findOne({ productId: id });
            if (isComment) {
                return res.status(400).json({
                    message: "Sản phẩm này đã được bình luận, không thể xóa!",
                });
            }
            const oldBook = await Books.findOne({ _id: id });
            if (!oldBook) {
                return res.status(400).json({
                    message: "Không tồn tại sản phẩm này",
                });
            }
            cloudinary.uploader.destroy(oldBook.idImage);
            const dataBook = await Books.findByIdAndDelete(id);
            if (!dataBook)
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            return res.status(200).json({ dataBook, message: "Xóa thành công" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    }
    async filter(req, res) {
        try {
            const category = req.query.category;
            const $regex = _.escapeRegExp(category);
            const $options = _.escapeRegExp("i");
            const minPrice = +req.query.minPrice;
            const maxPrice = +req.query.maxPrice;

            const query = {
                $or: [{ category: { $regex, $options } }],
                price: { $gte: +minPrice || 0, $lte: +maxPrice || 99999999 },
            };
            const dataBook = await Books.find(query);
            if (!dataBook)
                return res.status(400).json({
                    message: "Có lỗi xảy ra",
                });
            return res.status(200).json(dataBook);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    }
}
module.exports = new BookController();