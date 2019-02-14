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
  let id = req.params.id;

  knex('gallery')
    .select('id', 'author', 'link', 'description', 'created_at', 'updated_at')
    .where('id', id)
    .then((selection) => {
      entries.featured = selection[0];
      return entries;
    })
    .then((entries) => {
      return knex('gallery')
        .select('id', 'author', 'link', 'description', 'created_at', 'updated_at')
        .whereNot('id', id)
        .then((selection) => {
          entries.listings = selection;
          return entries;
        });
    })
    .then((entries) => {
      res.render('templates/detail', entries);
    });
});

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;

  knex('gallery')
    .select('id', 'author', 'link', 'description', 'updated_at')
    .where('id', id)
    .then((selection) => {
      console.log(selection);

      entries.featured = selection[0];
      res.render('templates/edit', entries);
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

router.put('/:id', (req, res) => {
  console.log('HIT');
  const id = req.params.id;
  const data = req.body;

  console.log('BOOKSHELF');
  Gallery
    .where('id', id)
    .fetch()
    .then((fetch) => {
      return fetch
        .save({
          author: data.author,
          link: data.link,
          description: data.description,
          updated_at : new Date()
        });
    })
    .then((fetch) => {
      console.log(fetch)
      res.redirect(`/gallery/${id}`);
    });
});

module.exports = router;
