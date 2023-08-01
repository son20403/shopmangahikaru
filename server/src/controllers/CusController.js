import Customer from "../models/Customers";

class CusController {
  //[GET]/customer
  async show(req, res) {
    try {
      const dataCus = await Customer.find({});
      if (!dataCus)
        return res.status(400).json({
          message: "Có lỗi xảy ra",
        });
      return res.status(200).json(dataCus);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  }
  //[GET]/customer/detail?id=
  async detail(req, res) {
    try {
      const id = req.query.id;
      const dataCus = await Customer.findById(id);
      if (!dataCus)
        return res.status(400).json({
          message: "Có lỗi xảy ra",
        });
      return res.status(200).json(dataCus);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  }
  //[POST]/customer/store
  async create(req, res) {
    try {
      const formData = req.body;
      const dataCus = await Customer(formData).save();
      if (!dataCus)
        return res.status(400).json({
          message: "Có lỗi xảy ra",
        });
      return res.status(200).json(dataCus);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  }
  //[GET]/customer/update
  async edit(req, res) {
    try {
      const id = req.query.id;
      const dataCus = await Customer.findById(id);
      if (!dataCus)
        return res.status(400).json({
          message: "Có lỗi xảy ra",
        });
      return res.status(200).json(dataCus);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  }
  //[PUT]/customer?id=
  async update(req, res) {
    try {
      const formData = req.body;
      const id = req.customer.id;
      const dataCus = await Customer.findByIdAndUpdate(id, formData, {
        new: true,
      });
      if (!dataCus)
        return res.status(400).json({
          message: "Có lỗi xảy ra",
        });
      return res.status(200).json(dataCus);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Lỗi Server",
      });
    }
  }
  //[DELETE]/customer?id=
  async delete(req, res) {
    try {
      const id = req.query.id;
      const dataCus = await Customer.findByIdAndDelete(id);
      if (!dataCus)
        return res.status(400).json({
          message: "Có lỗi xảy ra",
        });
      return res.status(200).json(dataCus);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: "Có lỗi xảy ra",
      });
    }
  }
}
module.exports = new CusController();
