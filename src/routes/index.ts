import express from "express";
import { studentRouter } from "./studentRoute";
import { markRouter } from "./markRoute";

export const indexRouter = express.Router();

indexRouter.use("/student", studentRouter);
indexRouter.use("/marks", markRouter);