"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_rides_1 = __importDefault(require("./get-rides"));
const get_ride_1 = __importDefault(require("./get-ride"));
const create_ride_1 = __importDefault(require("./create-ride"));
exports.default = {
    paths: {
        '/rides': Object.assign(Object.assign({}, get_rides_1.default), create_ride_1.default),
        '/rides/{id}': Object.assign({}, get_ride_1.default),
    },
};
