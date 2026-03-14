const mongoose = require('mongoose');

const cooked = new mongoose.Schema({
  user: { type: String, required: true },
  food: { type: String, required: true },
  servings: { type: String, required: true },
  date: { type: Date, required: true },
  address: { type: String, required: true },
  location: { type: String, required: true },
  delivery_by: { type: String, default: null },
  deliveryNumber: { type: Number, default: null },
});

module.exports = mongoose.model('Cooked', cooked);