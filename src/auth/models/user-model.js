'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelizeDB, DataTypes) => {
  return sequelizeDB.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCreate: (async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      }),
    },
  });
};