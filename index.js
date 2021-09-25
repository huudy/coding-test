"use strict";

const express = require("express");
const app = express();
const port = 8010;

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

const buildSchemas = require("./src/schemas");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const docs = require("./src/docs");
const specs = swaggerJsdoc(docs);

db.serialize(() => {
	buildSchemas(db);

	const app = require("./src/app")(db);
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

	app.listen(port, () =>
		console.log(`App started and listening on port ${port}`)
	);
});
