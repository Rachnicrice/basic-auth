'use strict';

// 3rd Party Resources
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
  start: app.listen(3000, () => console.log('server up')),
  sequelize: sequelize,
};