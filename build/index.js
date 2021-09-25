"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8010;
const body_parser_1 = __importDefault(require("body-parser"));
const jsonParser = body_parser_1.default.json();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const schemas_1 = require("./src/schemas");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const docs_1 = __importDefault(require("./src/docs"));
const specs = (0, swagger_jsdoc_1.default)(docs_1.default);
db.serialize(() => {
    (0, schemas_1.buildSchemas)(db);
    const app = require('./src/app')(db);
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    app.listen(port, () => console.log(`App started and listening on port ${port}`));
});
