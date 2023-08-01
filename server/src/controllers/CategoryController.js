import Categories from "../models/Categories";
import Books from "../models/Books";
const _ = require("lodash");
const cloudinary = require("cloudinary").v2;

class CategoryController {
    //[POST]/book/store
    async create(req, res) {
            const idStaf = req.customer.id;
            const formData = req.body;
            const { name } = formData;
            const fileData = req.file;
            const image = fileData.path;
            const idImage = fileData.filename;
            try {
                const isMatch = await Categories.findOne({ name });
                if (isMatch) {
                    if (fileData) cloudinary.uploader.destroy(idImage);
                    return res.status(400).json({
                        message: "Tên loại đã tồn tại",
                    });
                }
                const dataCategory = await Categories({
                    ...formData,
                    image,
                    idImage,
                    idStaf,
                }).save();

                if (dataCategory) {
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
        //[GET]/Categories
    async show(req, res) {
            try {
                const dataCategory = await Categories.find({});
                if (!dataCategory) {
                    return res.status(400).json({
                        message: "Có lỗi xảy ra",
                    });
                }
                return res.status(200).json(dataCategory);
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Lỗi Server",
                });
            }
        }
        //[GET]/Categories/detail?id=
    async detail(req, res) {
            try {
                const id = req.query.id;
                const dataCategory = await Categories.findById(id);
                if (!dataCategory)
                    return res.status(400).json({
                        message: "Có lỗi xảy ra",
                    });
                return res.status(200).json(dataCategory);
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
            const oldCategory = await Categories.findOne({ _id: id });
            if (!oldCategory) {
                if (fileData) cloudinary.uploader.destroy(newIdImage);
                return res.status(400).json({
                    message: "Không tồn tại loại này",
                });
            }
            if (fileData) cloudinary.uploader.destroy(oldCategory.idImage);

            const dataCategory = await Categories.findByIdAndUpdate(
                id, {...formData, image: newImage, idImage: newIdImage, idStaf }, {
                    new: true,
                }
            );
            if (!dataCategory) {
                if (fileData) cloudinary.uploader.destroy(newIdImage);
                return res.status(400).json({
                    message: "Có lỗi xảy ra, không thể update",
                });
            }
            return res
                .status(200)
                .json({ dataCategory, message: "Cập nhật thành công" });
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
                    $or: [{ name: { $regex, $options } }],
                };
                const dataCategory = await Categories.find(query);
                if (!dataCategory)
                    return res.status(400).json({
                        message: "Có lỗi xảy ra",
                    });
                return res.status(200).json(dataCategory);
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Lỗi Server",
                });
            }
        }
        //[DELETE]/Categories?id=
    async delete(req, res) {
        const id = req.query.id;
        try {
            const isProduct = await Books.findOne({ category: id });
            if (isProduct) {
                return res.status(400).json({
                    message: "Loại này đã có sản phẩm, không thể xóa",
                });
            }
            const oldCategory = await Categories.findOne({ _id: id });
            if (!oldCategory) {
                return res.status(400).json({
                    message: "Không tồn tại loại này",
                });
            }
            cloudinary.uploader.destroy(oldCategory.idImage);
            const dataCus = await Categories.findByIdAndDelete(id);
            if (!dataCus)
                return res.status(400).json({
                    message: "Xóa thất bại",
                });
            return res.status(200).json({ dataCus, message: "Xóa thành công" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Lỗi Server",
            });
        }
    }
}
module.exports = new CategoryController();