"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = __importDefault(require("express"));
const student_1 = require("../controllers/student");
exports.studentRouter = express_1.default.Router();
exports.studentRouter.get("/", student_1.getStudent);
exports.studentRouter.get("/:id", student_1.getStudentById);
exports.studentRouter.post("/", student_1.createStudent);
exports.studentRouter.patch("/:id", student_1.updateStudent);
exports.studentRouter.delete("/:id", student_1.deleteStudent);
