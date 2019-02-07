'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const routesListings = require('./routes/listings');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main.hbs'
}));
app.set('view engine', '.hbs');

app.use(express.static('./public'));
app.use(routesListings);

app.listen(PORT, () => {
  console.log(`listening in on port: ${PORT}`);
});
