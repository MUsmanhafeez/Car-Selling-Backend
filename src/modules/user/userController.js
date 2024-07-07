const userService = require("../user/userService");

//Get all users
const create = async (req, res, next) => {
  try {
    const users = await userService.create(req,res);
    // res.status(200).json({ message: "Users fetch successfully", data: users });
  } catch (err) {
    next(err);
  }
};
const login = async (req, res, next) => {
  try {
    const users = await userService.login(req,res);
    // res.status(200).json({ message: "Users fetch successfully", data: users });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  create
};
