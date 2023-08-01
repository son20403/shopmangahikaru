import jwt from "jsonwebtoken";

const middlewareAuth = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (!token) return res.status(401).json("You're not authenticated");
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, customer) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }
      req.customer = customer;
      next();
    });
  },
  verifyTokenAdmin: (req, res, next) => {
    middlewareAuth.verifyToken(req, res, () => {
      if (req.customer.admin) {
        next();
      } else {
        res.status(403).json("You're not authenticated admin");
      }
    });
  },
};

module.exports = middlewareAuth;
