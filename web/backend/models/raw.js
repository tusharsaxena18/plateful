const mongoose = require('mongoose');

const raw = new mongoose.Schema({
  user: { type: String, required: true },
  food: { type: String, required: true },
  quantity: { type: String, required: true },
  expiryDate: { type: Date, default: Date.now },
  address: { type: String, required: true },
  location: { type: String, required: true },
  delivery_by: { type: String, default: null },
  deliveryNumber: { type: Number, default: null },
});

module.exports = mongoose.model('Raw', raw);