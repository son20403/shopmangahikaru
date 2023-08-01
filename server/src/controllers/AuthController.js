import Customer from "../models/Customers";
import argon2 from "argon2";
import { generateAccessToken } from "../jwt";
const AuthController = {
  register: async (req, res) => {
    try {
      const formData = req.body;
      const { name, user_name, password, email } = formData;
      const hashPass = await argon2.hash(password);
      const customers = await Customer.findOne({ user_name });
      if (customers) {
        return res.status(400).json({
          message: "Tài khoản đã tồn tại",
        });
      }
      const modelCus = {
        name,
        user_name,
        password: hashPass,
        email,
      };
      const dataCus = await Customer(modelCus).save();
      if (!dataCus)
        return res.status(400).json({
          message: "Có lỗi xảy ra",
        });
      return res.status(200).json({
        message: "Tạo tài khoản thành công",
      });
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).jsonp({
        message: "Server is error",
      });
    }
  },

  login: async (req, res) => {
    try {
      const { user_name, password } = req.body;
      if (!user_name && !password)
        return res.status(400).json({
          message: "Không được bỏ trống",
        });

      const customer = await Customer.findOne({ user_name });
      if (!customer) {
        return res.status(402).jsonp({
          message: "Sai tài khoản",
        });
      }
      const passwordValid = await argon2.verify(customer.password, password);
      if (!passwordValid) {
        return res.status(402).jsonp({
          message: "Sai mật khẩu",
        });
      }
      if (customer && passwordValid) {
        const accessToken = generateAccessToken(customer);
        const { password, ...others } = customer._doc;
        return res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).json({
        message: "Server is error",
      });
    }
  },
  getDataCustomer(req, res) {
    try {
      const id = req.customer.id;
      const customer = req.customer;
      if (!id) {
        return res.status(400).json({
          message: "Có lỗi xảy ra!!!",
        });
      }
      return res.status(200).json({
        message: "Lấy dữ liệu thành công",
        customer,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Lỗi server!!!",
      });
    }
  },
};
module.exports = AuthController;
