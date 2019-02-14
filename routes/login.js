'use strict';

const express = require('express');
const knex = require('../database/knex');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('../database/models/User');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('GETTING LOGIN');
  res.render('templates/login');
});

passport.use(new LocalStrategy(function (username, password, done) {
  return new User({ username: username }).fetch()
  .then (user => {
    user = user.toJSON();
    console.log(user);

    if (user === null) {
      return done(null, false, { message: 'bad username or password' });
    } else {
      bcrypt.compare(password, user.password)
        .then((res) => {
          if (res) { return done(null, user); }
          else {
            return done(null, false, { message: 'bad username or password' });
          }
        });
    }
  })
  .catch((err) => {
    console.log('error: ', err);
    return done(err);
  });
}));

router.post('/', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;
