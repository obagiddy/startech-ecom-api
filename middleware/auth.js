const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    res.json("unauthorized access");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id).select("-password");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

const admin = (req, res, next) => {
  if (req.user.role !== "admin") {
    res.json("Access Denied");
  }
  next();
};

module.exports = { auth, admin };
