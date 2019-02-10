'use strict';

const express = require('express');
const knex = require('../database/knex');

const validation = require('../middleware/validation');
const User = require('../database/models/User');
const Gallery = require('../database/models/Gallery');

const router = express.Router();

const entries = {
  featured: undefined,
  listings: undefined,
}

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { next(); }
  else { res.redirect('/'); }
}

router.get('/new', (req, res) => {
  res.render('templates/new');
});

router.get('/:id', (req, res) => {
  // had to subtract 3 from id instead of 1 for some reason...
  const databaseId = req.params.id - 3;

  knex('gallery')
    .select('id', 'author', 'link', 'description', 'created_at', 'updated_at')
    .then((selection) => {
      const getFeatured = selection[databaseId];
      const withoutFeatured = selection.filter(x => { return selection.indexOf(x) !== databaseId });
      const getListings = withoutFeatured.splice(0, 3);

      entries.featured = getFeatured;
      entries.listings = getListings;

      res.render('templates/detail', entries);
    });
});

router.post('/post', validation.authenticate, (req, res) => {
  const data = req.body;
  console.log(`Gallery is...`); console.log(Gallery);

  new Gallery({
    author: data.author,
    link: data.link,
    description: data.description
  })
    .save()
    .then((user) => {
      console.log(`USER IS:`); console.log(user);
      res.redirect('/');
    });
});

module.exports = router;
