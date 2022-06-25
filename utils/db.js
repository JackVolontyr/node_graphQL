const { Sequelize } = require("sequelize");
const { isEnvDev } = require(".");

const SEQUELIZE_OPTIONS = { host: 'localhost', dialect: 'mysql' };
let DB_NAME, USER_NAME, PASSWORD;

if (isEnvDev()) {
	const keys = require("../keys");
	DB_NAME = keys.DB_NAME; 
	USER_NAME = keys.USER_NAME; 
	PASSWORD = keys.PASSWORD; 

} else {
	DB_NAME = process.env.DB_NAME; 
	USER_NAME = process.env.USER_NAME; 
	PASSWORD = process.env.PASSWORD;

	// TODO: rm for PRODUCTION (for locale pm2)
	const keys = require("../keys");
	DB_NAME = keys.DB_NAME; 
	USER_NAME = keys.USER_NAME; 
	PASSWORD = keys.PASSWORD; 
}

const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, SEQUELIZE_OPTIONS);

module.exports = sequelize;