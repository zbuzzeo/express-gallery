'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('hit');
  res.render('templates/listings');
});

module.exports = router;
