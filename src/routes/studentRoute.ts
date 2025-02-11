import express from "express";
import { getStudent, getStudentById, createStudent, updateStudent, deleteStudent } from "../controllers/student";

export const studentRouter = express.Router();

studentRouter.get("/", getStudent);
studentRouter.get("/:id", getStudentById);
studentRouter.post("/", createStudent);
studentRouter.patch("/:id", updateStudent);
studentRouter.delete("/:id", deleteStudent);
