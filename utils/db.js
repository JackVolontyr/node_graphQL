const { Sequelize } = require("sequelize");
require('dotenv').config();
const { DB_NAME, USER_NAME, PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
	host: 'localhost',
	dialect: 'mysql',
});

module.exports = sequelize;