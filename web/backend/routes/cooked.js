const express = require('express');
const router = express.Router();
const Cooked = require('../models/cooked');

// Get all cooked food donations
router.get('/', async (req, res) => {
  try {
    const items = await Cooked.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new cooked food donation
router.post('/', async (req, res) => {
  try {
    const item = new Cooked(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete cooked food by ID
router.delete('/:id', async (req, res) => {
  try {
    await Cooked.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cooked item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
