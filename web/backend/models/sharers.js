const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isFunction } = require('util');

const sharersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  ngoName: { type: String, required: true },
  ngoAddress: { type: String, required: true },
  ifsc: { type: String, required: true },
  bankAccount: { type: String, required: true },
  panNumber: { type: String, required: true },
});

// Hash password before saving
sharersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Sharers', sharersSchema);
