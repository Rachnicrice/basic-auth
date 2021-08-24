'use strict';

// 3rd Party Resources
require('dotenv').config();
const express = require('express');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);


// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));

module.exports = {
  app: app,
  start: port => { app.listen(port, () => console.log('server up')); },
  sequelize: sequelize,
};