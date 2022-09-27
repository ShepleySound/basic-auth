'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelizeDB, DataTypes) => {
  const user = sequelizeDB.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(64),
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
  user.prototype.validateLogin = async function(password) {
    return await bcrypt.compare(password, this.password);
  };
  return user;
};