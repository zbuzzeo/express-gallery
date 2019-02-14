'use strict';

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { next(); }
  else { res.redirect('/'); }
}

module.exports = {
  authenticate: isAuthenticated,
}
