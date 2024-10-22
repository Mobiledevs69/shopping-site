const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user || null; // Assuming you store user info in the session
  next();
});

router.get('/', (req, res) => {
  res.render('index', { title: "Home" });
});

router.get('/home', (req, res) => {
  res.render('home', { title: "Home" })
})

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.redirect('/home');
      }
      res.clearCookie('connect.sid'); // Adjust according to your cookie settings
      res.redirect('/'); // Redirect after logout
  });
});

router.get('/about', (req, res) => {
  res.render('about', { title: "About Us" })
})

module.exports = router;
