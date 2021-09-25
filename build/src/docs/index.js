"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basicInfo_1 = __importDefault(require("./basicInfo"));
const servers_1 = __importDefault(require("./servers"));
const components_1 = __importDefault(require("./components"));
const rides_1 = __importDefault(require("./rides"));
exports.default = {
    definition: Object.assign(Object.assign(Object.assign(Object.assign({}, basicInfo_1.default), servers_1.default), components_1.default), rides_1.default),
    apis: ['/rides'],
};
