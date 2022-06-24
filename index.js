const express = require("express");
var { graphqlHTTP } = require('express-graphql');
const path = require("path");

const schema = require("./graphql/schema");
const resolver = require("./graphql/resolver");
const sequelize = require("./utils/db");

const app = express();

// USE
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(graphqlHTTP({
	schema,
	rootValue: resolver,
	graphiql: true
}));

//app.use((_, res) => res.sendFile('/index.html') );

// START
async function start() {
	try {
		/**
		 * DROP DATABASE
		 * sequelize.sync({force: true});
		 */

		sequelize.sync();

		const PORT = process.env.PORT || 8001;
		app.listen(PORT, _ => console.log(`Starts on ${PORT} PORT.`))

	} catch (error) { console.log(error); }
}

start();