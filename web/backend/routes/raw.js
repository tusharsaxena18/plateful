const express = require('express');
const router = express.Router();
const Raw = require('../models/raw');

// Get all raw food donations
router.get('/', async (req, res) => {
  try {
    const items = await Raw.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new raw food donation
router.post('/', async (req, res) => {
  try {
    const newItem = new Raw(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete raw food by ID
router.delete('/:id', async (req, res) => {
  try {
    await Raw.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
