'use strict';
const bcrypt = require('bcrypt');

// Create a Sequelize model
const UserModel = (sequelize, DataTypes) => {
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

  Users.authenticate( async (user, password) => {
    return await bcrypt.compare(password, user.password);
  });
};

module.exports = UserModel;