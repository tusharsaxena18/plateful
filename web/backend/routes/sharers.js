const express = require('express');
const router = express.Router();
const Sharers = require('../models/sharers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get all sharers
router.get('/', async (req, res) => {
  try {
    const sharers = await Sharers.find();
    res.json(sharers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new sharer
router.post('/', async (req, res) => {
  try {
    const sharer = new Sharers(req.body);
    await sharer.save();
    res.status(201).json(sharer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete sharer by ID
router.delete('/:id', async (req, res) => {
  try {
    await Sharers.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sharer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route for Sharers
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const sharer = await Sharers.findOne({ email });
      if (!sharer) return res.status(404).json({ message: 'Sharer not found' });
  
      const isMatch = await bcrypt.compare(password, sharer.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ id: sharer._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
  
      res.json({ token, sharer: { name: sharer.name, email: sharer.email, ngoName: sharer.ngoName } });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
