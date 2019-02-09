'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');

const routesListings = require('./routes/listings');
const User = require('./database/models/User');
const PORT = process.env.PORT || 8080;
const ENV = process.env.development || 'development';
const SESSION_SECRET = process.env.SESSION_SECRET || 'keyboard cat';
const saltRoudns = 12; // bcrypt salts

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main.hbs'
}));
app.set('view engine', '.hbs');

// PassportJS: write these in before all of the routes are installed so that all routes have sessions sitting in front of it.
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./public'));
app.use(routesListings);

// serializeUser happens after login
passport.serializeUser((user, done) => {
  console.log('serializing');
  return done(null, {
    id: user.id,
    username: user.username
  });
});

// deserializeUser happens after every request
passport.deserializeUser((user, done) => {
  console.log('deserializing');
  new User({ id: user.id }).fetch()
    .then(user => {
      user = user.toJSON();
      return done(null, {
        id: user.id,
        username: user.username
      });
  })
    .catch((err) => {
      console.log(err);
      return done(err);
    });
});

app.listen(PORT, () => {
  console.log(`listening in on port: ${PORT}`);
});
