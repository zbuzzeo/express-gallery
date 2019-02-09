'use strict';

const express = require('express');
const knex = require('../database');
const router = express.Router();

const entries = {
  featured: undefined,
  listings: undefined,
}

router.get('/login', (req, res) => {
  res.render('templates/login');
});

router.get('/register', (req, res) => {
  res.render('templates/register');
})

router.get('/', (req, res) => {
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
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  knex('gallery')
    .select('author', 'link', 'description', 'created_at', 'updated_at')
    .where('id', id)
    .then(console.log)
    .catch((err) => {
      throw err;
    });
});

module.exports = router;
