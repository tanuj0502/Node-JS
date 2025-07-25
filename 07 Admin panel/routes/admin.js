// routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => res.render('login'));

router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    req.session.user = user;
    res.redirect('/dashboard');
  } else {
    res.send('Invalid credentials');
  }
});

router.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.redirect('/login');
  res.render('dashboard', { user: req.session.user });
});

module.exports = router;
