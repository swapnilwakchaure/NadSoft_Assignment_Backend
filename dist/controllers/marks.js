"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMarkById = exports.updateMarkById = exports.createMark = exports.getMarksByStudentId = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createMark = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject, score, studentId } = req.body;
    try {
        if (!subject || !score || !studentId) {
            res.status(400).json({ message: "All fields are required", status: "warn" });
            return;
        }
        const newMark = yield prisma.mark.create({
            data: { subject, score, studentId },
        });
        console.log({ newMark });
        res.status(201).json({ message: "Mark created successfully", status: "success" });
    }
    catch (error) {
        console.error("Error creating mark:", error);
        res.status(500).json({ message: "Failed to create mark", status: "error", error: error });
    }
});
exports.createMark = createMark;
const getMarksByStudentId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    try {
        if (!studentId) {
            res.status(400).json({ message: "Student ID is required", status: "warn" });
            return;
        }
        const marks = yield prisma.mark.findMany({
            where: { studentId: Number(studentId) },
        });
        res.status(200).json({ message: "Marks retrieved successfully", data: marks, status: "success" });
    }
    catch (error) {
        console.error("Error retrieving marks:", error);
        res.status(500).json({ message: "Failed to retrieve marks", status: "error", details: error });
    }
});
exports.getMarksByStudentId = getMarksByStudentId;
const updateMarkById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { subject, score } = req.body;
    try {
        if (!id) {
            res.status(400).json({ message: "Id is missing", status: "warn" });
        }
        if (!subject || !score) {
            res.status(400).json({ message: "Subject and score are required", status: "warn" });
            return;
        }
        const updatedMark = yield prisma.mark.update({
            where: { id: Number(id) },
            data: { subject, score },
        });
        console.log({ updatedMark });
        res.status(200).json({ message: "Mark updated successfully", status: "success" });
    }
    catch (error) {
        console.error("Error updating mark:", error);
        res.status(500).json({ message: "Failed to update mark", status: "error", details: error });
    }
});
exports.updateMarkById = updateMarkById;
const deleteMarkById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            res.status(400).json({ message: "Id is missing", status: "warn" });
        }
        const deletedMark = yield prisma.mark.delete({
            where: { id: Number(id) },
        });
        console.log({ deletedMark });
        res.status(200).json({ message: "Mark deleted successfully", status: "success" });
    }
    catch (error) {
        console.error("Error deleting mark:", error);
        res.status(500).json({ message: "Failed to delete mark", status: "error", details: error });
    }
});
exports.deleteMarkById = deleteMarkById;
