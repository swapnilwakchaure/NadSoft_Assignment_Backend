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
exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getStudent = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 5, query = "" } = req.query;
    const currentPage = Number(page);
    const itemsPerPage = Number(limit);
    try {
        const totalStudents = yield prisma.student.count();
        const students = yield prisma.student.findMany({
            where: {
                OR: [
                    { name: { contains: String(query), mode: 'insensitive' } },
                    { email: { contains: String(query), mode: 'insensitive' } }
                ]
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
            orderBy: { createdAt: 'desc' }
        });
        // Response with pagination metadata
        res.status(200).json({
            message: "Get all students data",
            data: students,
            pagination: {
                totalItems: totalStudents,
                totalPages: Math.ceil(totalStudents / itemsPerPage),
                currentPage,
                itemsPerPage
            },
            status: "success"
        });
    }
    catch (error) {
        console.error("Error while getting the student data: ", error);
        res.status(500).json({ message: "Internal Server Error", status: "error" });
    }
});
exports.getStudent = getStudent;
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            res.status(400).json({ message: "Id is missing", status: "warn" });
            return;
        }
        const data = yield prisma.student.findFirst({
            where: { id: Number(id) }, include: { marks: true }
        });
        if (!data) {
            res.status(400).json({ message: "Student not found", status: "warn" });
            return;
        }
        res.status(200).json({ message: "Get the student data by id", data, status: "success" });
    }
    catch (error) {
        console.error("Error while get the student data by id: ", error);
        res.status(500).json({ message: "Internal Server Error", status: "error" });
    }
});
exports.getStudentById = getStudentById;
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, age, parentId } = req.body;
    try {
        if (!name || !email || !age || !parentId) {
            res.status(400).json({ message: "All fields are required", status: "warn" });
            return;
        }
        const isEmailOrIdExist = yield prisma.student.findFirst({
            where: {
                OR: [{ email }, { parentId }]
            }
        });
        if (isEmailOrIdExist) {
            res.status(400).json({ message: "Email or Parent ID already exists", status: "warn" });
            return;
        }
        const newStudent = yield prisma.student.create({
            data: { name, email, age, parentId },
        });
        console.log({ newStudent });
        res.status(201).json({ message: "Data successfully uploaded", status: "success" });
    }
    catch (error) {
        console.log("error while create student: ", error);
        res.status(500).json({ error: 'Failed to create student' });
    }
});
exports.createStudent = createStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, age, parentId } = req.body;
    try {
        if (!id || !name || !email || !age || !parentId) {
            res.status(400).json({ message: "All fields are required", status: "warn" });
            return;
        }
        const updatedStudent = yield prisma.student.update({
            where: { id: Number(id) },
            data: { name, email, age, parentId },
        });
        console.log({ updatedStudent });
        res.status(200).json({ message: "Student successfully updated", status: "success" });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update student', details: error });
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            res.status(400);
        }
        const deletedStudent = yield prisma.student.delete({
            where: { id: Number(id) },
        });
        console.log({ deletedStudent });
        res.status(200).json({ message: "Student successfully deleted", status: "success" });
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to delete student', details: error });
    }
});
exports.deleteStudent = deleteStudent;
