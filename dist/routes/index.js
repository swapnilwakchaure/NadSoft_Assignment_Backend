"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRouter = void 0;
const express_1 = __importDefault(require("express"));
const studentRoute_1 = require("./studentRoute");
const markRoute_1 = require("./markRoute");
exports.indexRouter = express_1.default.Router();
exports.indexRouter.use("/student", studentRoute_1.studentRouter);
exports.indexRouter.use("/marks", markRoute_1.markRouter);
