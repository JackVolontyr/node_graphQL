const Todo = require('../models/Todo');

module.exports = {
	async getTodos() {
		try {
			return await Todo.findAll();
			
		} catch (error) { throw new Error('Error todos fetching from Resolver.'); }
	},

	async addTodo({todo}) {
		try {
			const { title, labelText, labelColor } = todo;
			return await Todo.create({ title, labelText, labelColor, done: false });

		} catch (error) { throw new Error('Error todo creating from Resolver.'); }
	},

	async completeTodo({id}) {
		try {
			const todo = await Todo.findByPk(id);
			todo.done = true;
			await todo.save();
			return todo;

		} catch (error) { throw new Error('Error todo updating from Resolver.'); }
	},

	async removeTodo({id}) {
		try {
			const todos = await Todo.findAll({ where: { id } })
			await todos[0].destroy();
			return true;

		} catch (error) { 
			throw new Error('Error todo removing from Resolver.');
			return false;
		}
	}
};