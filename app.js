const express = require('express');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('./config/passportConfig');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt');


// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// Models import
const Product = require('./models/product');
const User = require('./models/User');

// Session middleware
app.use(session({
  secret: 'BFbakjnfwfivveslkefnksnf,fewp.feof',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
},
async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        const isMatch = await user.validatePassword(password); // Use a method to check the password
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// Serve static files (e.g., CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('An error occured when trying to connect to MongoDB: ' + err)
  })

// Routes imports
app.use('/', require('./routes/index'));
app.use('/admin', require('./routes/admin'));
app.use('/account', require('./routes/account'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
