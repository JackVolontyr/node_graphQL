const { Sequelize } = require("sequelize");
const sequelize = require("../utils/db");

const Todo = sequelize.define('Todo', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		type: Sequelize.INTEGER,
	},
	done: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	labelText: {
		type: Sequelize.STRING,
		allowNull: false
	},
	labelColor: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = Todo;