require('dotenv').config();

const express = require("express");
var { graphqlHTTP } = require('express-graphql');
const path = require("path");

const schema = require("./graphql/schema");
const resolver = require("./graphql/resolver");
const { isEnvDev } = require("./utils");
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

		const PORT = process.env.PORT || (isEnvDev() ? 8001 : 8002); // :8002 for pm2
		
		app.listen(PORT, _ => {
			if (isEnvDev()) {
				console.log(`Starts on http://localhost:${PORT}/`);

			} else {
				console.log(`Starts on ${PORT} PORT.`);
			}
		});

	} catch (error) { console.log(error); }
}

start();