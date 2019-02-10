'use strict';

const express = require('express');
const knex = require('../database/knex');
const router = express.Router();

const entries = {
  featured: undefined,
  listings: undefined,
}

router.get('/new', (req, res) => {
  res.render('templates/new');
});

router.get('/:id', (req, res) => {
  const databaseId = req.params.id - 1;

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

module.exports = router;
