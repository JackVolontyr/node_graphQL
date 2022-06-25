const { Sequelize } = require("sequelize");
const { DB_NAME, USER_NAME, PASSWORD } = require("../keys");

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, {
	host: 'localhost',
	dialect: 'mysql',
});

module.exports = sequelize;