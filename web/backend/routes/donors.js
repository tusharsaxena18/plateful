const express = require('express');
const router = express.Router();
const Donors = require('../models/donors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const donor = await Donors.findOne({ email });
        if (!donor) return res.status(404).json({ message: 'Donor not found' });

        const isMatch = await bcrypt.compare(password, donor.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: donor._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.json({ token, donor: { name: donor.name, email: donor.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
      const donors = await Donors.find();
      res.json(donors);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Add a new donor
router.post('/', async (req, res) => {
    try {
        const donor = new Donors(req.body);
        await donor.save();
        res.status(201).json(donor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete donor by ID
router.delete('/:id', async (req, res) => {
    try {
        await Donors.findByIdAndDelete(req.params.id);
        res.json({ message: 'Donor deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;