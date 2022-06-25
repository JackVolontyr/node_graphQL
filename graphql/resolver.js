const Todo = require('../models/Todo');
const path = require('path');

const getErrorString = subString => `Error todos ${subString} from Resolver in ${path.resolve(__dirname, './resolver.js')}`;

module.exports = {
	async getTodos() {
		try {
			return await Todo.findAll();
			
		} catch (error) { throw new Error(getErrorString('FETCHING')); }
	},

	async addTodo({todo}) {
		try {
			const { title, labelText, labelColor } = todo;
			return await Todo.create({ title, labelText, labelColor, done: false });

		} catch (error) { throw new Error(getErrorString('CREATING')); }
	},

	async completeTodo({id}) {
		try {
			const todo = await Todo.findByPk(id);
			todo.done = true;
			await todo.save();
			return todo;

		} catch (error) { throw new Error(getErrorString('UPDATING')); }
	},

	async removeTodo({id}) {
		try {
			const todos = await Todo.findAll({ where: { id } })
			await todos[0].destroy();
			return true;

		} catch (error) { 
			throw new Error(getErrorString('REMOVING'));
			return false;
		}
	}
};