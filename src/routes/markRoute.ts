import express from "express";
import { getMarksByStudentId, createMark, updateMarkById, deleteMarkById } from "../controllers/marks";

export const markRouter = express.Router();

markRouter.get("/studentId", getMarksByStudentId);
markRouter.post("/", createMark);
markRouter.patch("/id", updateMarkById);
markRouter.delete("/id", deleteMarkById);