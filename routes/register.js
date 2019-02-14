'use strict';

const express = require('express');
const knex = require('../database/knex');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../database/models/User');
const saltRounds = 12; // bcrypt salts

router.get('/', (req, res) => {
  console.log('GETTING REGISTER');
  res.render('templates/register');
})

// handling creating a new user
router.post('/', (req, res) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) { console.log(err); }

    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) { console.log(err); }

      return new User({
        username: req.body.username,
        password: hash // instead of saving the password, save the hashed password
      })
        .save()
        .then((user) => {
          console.log(user);
          res.redirect('/login');
        })
        .catch((err) => {
          console.log(err);
          return res.send('Error creating account');
        });
    });
  });
});

module.exports = router;
