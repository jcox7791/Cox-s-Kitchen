'use strict';
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  // index: false,
  // maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", express.static('site', options));

// Calling the "routers_modules".
const hamburgers_sandwiches = require('./modules_routes/hamburger_sandwiches/hamburgers_sanndwichesRouter');
const baconCheeseBurger = require('./modules_routes/hamburger_sandwiches/hamburgers/baconCheeseRouter.js'); 
// Routes
app.use(hamburgers_sandwiches);
app.use(baconCheeseBurger);


app.listen(PORT, () => {
  console.log(`\app running on port ${PORT}!`)
});