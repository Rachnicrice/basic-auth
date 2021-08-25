'use strict';

// 3rd Party Resources
require('dotenv').config();
const express = require('express');

const authRoutes = require('./routes/users.js');

// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);

module.exports = {
  app: app,
  start: port => { app.listen(port, () => console.log('server up')); },
};