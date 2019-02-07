'use strict';

const express = require('express');
const knex = require('../database');
const router = express.Router();

const entries = {
  featured: undefined,
  listings: undefined,
}

router.get('/', (req, res) => {
  console.log('hit');

  knex('gallery')
    .select('author', 'link', 'description', 'created_at', 'updated_at')
    .then((selection) => {
      const withoutFeature = selection.filter(x => { return selection.indexOf(x) !== 0 });

      entries.featured = selection[0];
      entries.listings = withoutFeature;
      res.render('templates/listings', entries);
    })
    .catch((err) => {
      throw err;
    });

  // res.render('templates/listings');
});

module.exports = router;
