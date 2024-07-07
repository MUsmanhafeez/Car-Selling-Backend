const User = require("./userModel"); // Assuming you have a User model
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Create a new user
    let user = new User({
      email,
      password,
    });

    await user.save();

    // Generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = create;

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Case-insensitive query for email
    const user = await User.findOne({
      email: { $regex: new RegExp(email, "i") },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password match
    const isMatch = await user.comparePassword(password,user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Successfully Logged In!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  login,
  create,
};
