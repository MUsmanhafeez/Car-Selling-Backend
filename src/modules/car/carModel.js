// backend/models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  model: { type: String, required: false },
  price: { type: Number, required: false },
  phone: { type: String, required: false },
  city: { type: String, required: false },
  images: {type: Array},
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now},
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
