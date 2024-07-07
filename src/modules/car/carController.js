const carService = require("../car/carService");

//Get all users
const createCarRecord = async (req, res, next) => {
  try {
    const car = await carService.createCarRecord(req,res);
    // res.status(200).json({ message: "Users fetch successfully", data: users });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCarRecord,
};
