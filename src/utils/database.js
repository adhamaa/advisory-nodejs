require('dotenv').config();
const { Sequelize } = require('sequelize');
const config = require('../../config/config');

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging || false, // Disable logging by default
});

module.exports = sequelize;
