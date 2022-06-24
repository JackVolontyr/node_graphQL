const { buildSchema } = require("graphql");

module.exports = buildSchema(`
	type Todo {
		id: ID!
		title: String!
		labelText: String!
		labelColor: String!
		done: Boolean!
		createdAt: String
		updatedAt: String
	}

	type Query {
		getTodos: [Todo!]!
	}

	input TodoInputTitle {
		title: String!
		labelText: String!
		labelColor: String!
	}

	type Mutation {
		addTodo(todo: TodoInputTitle!): Todo!
		completeTodo(id: ID!): Todo!
		removeTodo(id: ID!): Boolean!
	}
`);