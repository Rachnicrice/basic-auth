'use strict';
const bcrypt = require('bcrypt');

const { sequelize, DataTypes} = require('./index.js');

// Create a Sequelize model
const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.beforeCreate((user, options) => {
  return bcrypt.hash(user.password, 10).then(hashedPass => {
    user.password = hashedPass;
  });
});

Users.authenticate = async (username, password) => {
  const user = await Users.findOne({ where: { username: username } });
  const valid = await bcrypt.compare(password, user.password);

  if (valid) return user;
  return new Error('Unauthenticated');
};


module.exports = Users;