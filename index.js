'use strict';

require('dotenv').config();
const app = require('./src/server.js');
const { sequelize } = require('./src/schemas/index.js');
const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    app.start(PORT);
  }).catch(e => {
    console.error('Could not start server', e.message);
  });