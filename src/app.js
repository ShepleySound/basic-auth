'use strict';

// 3rd Party Resources
const { Sequelize, DataTypes } = require('sequelize');

// NOTE: connected to sqlite::memory out of box for proof of life
// TODO: 
// connect postgres for local dev environment and prod
// handle SSL requirements
// connect with sqlite::memory for testing
const DATABASE_URL = 'sqlite::memory';

const sequelizeDB = new Sequelize(DATABASE_URL);
const User = require('./auth/models/user-model')(sequelizeDB, DataTypes);

module.exports = { sequelizeDB, User };