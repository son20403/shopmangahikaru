import jwt from "jsonwebtoken";

const generateAccessToken = (customer) => {
  return jwt.sign(
    {
      id: customer._id,
      admin: customer.admin,
      username: customer.user_name,
      avatar: customer.image,
    },
    process.env.JWT_ACCESS_KEY,
    {
      expiresIn: "1d",
    }
  );
};
const generateRefreshToken = (customer) => {
  return jwt.sign(
    {
      id: customer._id,
      admin: customer.admin,
      username: customer.user_name,
      avatar: customer.avatar,
    },
    process.env.JWT_REFRESH_KEY,
    {
      expiresIn: "360d",
    }
  );
};
module.exports = { generateAccessToken, generateRefreshToken };
