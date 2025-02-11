"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markRouter = void 0;
const express_1 = __importDefault(require("express"));
const marks_1 = require("../controllers/marks");
exports.markRouter = express_1.default.Router();
exports.markRouter.get("/studentId", marks_1.getMarksByStudentId);
exports.markRouter.post("/", marks_1.createMark);
exports.markRouter.patch("/:id", marks_1.updateMarkById);
exports.markRouter.delete("/:id", marks_1.deleteMarkById);
