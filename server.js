'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const redis = require('connect-redis')(session);

const routesListings = require('./routes/listings');
const routesGallery = require('./routes/gallery');
const routesLogin = require('./routes/login');
const routesRegister = require('./routes/register');
const routesLogout = require('./routes/logout');

const User = require('./database/models/User');
const PORT = process.env.PORT || 8080;
const ENV = process.env.development || 'development';
const SESSION_SECRET = process.env.SESSION_SECRET || 'keyboard cat';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  store: new redis({ url: 'redis://redis-server:6379', logErrors: true }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: ENV === 'production' }
}));

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main.hbs'
}));
app.set('view engine', '.hbs');

app.use(express.static('public'));
app.use('/gallery', express.static('public'));

// PassportJS: write these in before all of the routes are installed so that all routes have sessions sitting in front of it.
app.use(passport.initialize());
app.use(passport.session());

// serializeUser happens after login
passport.serializeUser((user, done) => {
  console.log('serializing');
  return done(null, {
    id: user.id,
    username: user.username
  });
});

// deserializeUser happens after every request
passport.deserializeUser((user, done) => {
  console.log('deserializing');
  new User({ id: user.id }).fetch()
    .then(user => {
      user = user.toJSON();
      return done(null, {
        id: user.id,
        username: user.username
      });
  })
    .catch((err) => {
      console.log(err);
      return done(err);
    });
});

// basic routes that do not need their own file...
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { next(); }
  else { res.redirect('/'); }
}

app.get('/secret', isAuthenticated, (req, res) => {
  // the req.user is all of the deserializedUser information.
  console.log('req.user: ', req.user);
  console.log('req.user id', req.user.id);
  console.log('req.username', req.user.username);
  res.send('you found the secret!');
});

// if somebody tries to go to /gallery
app.get('/gallery', (req, res) => {
  res.redirect('/');
});

// configuring route handlers
app.use(routesListings);
app.use('/gallery', routesGallery);
app.use('/login', routesLogin);
app.use('/register', routesRegister);
app.use('/logout', routesLogout);

app.listen(PORT, () => {
  console.log(`listening in on port: ${PORT}`);
});
