'use strict';

const express = require('express');
const knex = require('../database/knex');
const router = express.Router();

router.get('/', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
