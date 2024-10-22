const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { isNormalUser } = require('../middleware/auth');

router.use((req, res, next) => {
  res.locals.user = req.user || null; // Assuming you store user info in the session
  next();
});

router.get('/register', (req, res) => {
  res.render('auth/register', { title: "Register" });
});

router.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    password: hashedPassword
  });

  try {
    await user.save();
    res.redirect('/account/login');
  } catch (error) {
    console.error(error);
  };
});

router.get('/login', (req, res) => {
  res.render('auth/login', { title: "Login" });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/account/login',
    failureFlash: false
  })(req, res, next);
});

router.get('/myaccount', (req, res) => {
  res.render('profile', { title: 'Profile' });
});

router.get('/edit')

module.exports = router;
