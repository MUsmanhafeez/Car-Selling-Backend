const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv"); // Load environment variables from .env
const { connectToDatabase } = require("./config/database");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
// Load environment variables from .env file
dotenv.config();

// Import routes and controllers
const userRoutes = require("./modules/user/userRoute");
const carRoutes = require("./modules/car/carRoute");

const app = express();

const port = process.env.PORT || 3000;

connectToDatabase();
// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Express middleware
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});
// all routes
app.use("/car", carRoutes);
app.use("/user", userRoutes);

app.use(errorHandler);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
