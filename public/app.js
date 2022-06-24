const getRequest = query => {
	const graphql = '/graphql';
	const method = 'post';
	const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
	const body = JSON.stringify({ query });

	return [ graphql, { method, headers, body } ];
}; 

const fetchChaine = (query, cb) => {
	fetch(...getRequest(query))
		.then(res => res.json())
		.then(cb)
		.catch(error => console.log(error));
}

const schemaParams = 'id title done labelText labelColor createdAt updatedAt';

new Vue({
	el: '#app',

	vuetify: new Vuetify({ theme: { dark: true } }),

	data: () => ({ todoTitle: '', todos: [] }),

	created() {
		const query = `query { getTodos { ${schemaParams} } }`;
		fetchChaine(query, res => this.todos = res.data.getTodos);
	},

	methods: {
		addTodo() {
			const titleValue = this.todoTitle.trim();
			if (!titleValue) return;

			const titleArrayView = titleValue.split('||');
			const title = titleArrayView[0];
			const labelText = titleArrayView[1] || '';
			const labelColor = titleArrayView[2] || '#b388ff';

			const query = `mutation { addTodo(todo: {
				title: "${title.trim()}" labelText: "${labelText.trim()}" labelColor: "${labelColor.trim()}"
			}) { ${schemaParams} } }`;

			console.log();

			fetchChaine(query, res => {
				this.todos.push(res.data.addTodo);
				this.todoTitle = '';
			});
		},

		completeTodo(id) {
			const query = `mutation { completeTodo(id: ${id}) { updatedAt } }`;

			fetchChaine(query, res => {
				const index = this.todos.findIndex(item => item.id === id);
				this.todos[index].updatedAt = res.data.completeTodo.updatedAt;
			});
		},

		removeTodo(id) {
			const query = `mutation { removeTodo(id: ${id}) }`;

			fetchChaine(query, _ => {
				this.todos = this.todos.filter(item => item.id !== id);
			});
		}
	},

	filters: {
		capitalize: value => value.toString().charAt(0).toUpperCase() + value.slice(1),

		date(value, withTime) {
			const options = { year: 'numeric', month: 'long', day: '2-digit' };

			if (withTime) {
				options.hour = '2-digit';
				options.minute = '2-digit';
				options.second = '2-digit';
			}

			return new Intl.DateTimeFormat('en-EN', options).format(new Date(+value));
		}
	}
});