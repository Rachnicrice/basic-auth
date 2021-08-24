'use strict';

require('dotenv').config();
const { app, sequelize } = require('./src/server.js');


sequelize.sync()
  .then(() => {
    app.start();
  }).catch(e => {
    console.error('Could not start server', e.message);
  });