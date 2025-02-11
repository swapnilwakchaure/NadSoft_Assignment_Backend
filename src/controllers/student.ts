import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getStudent = async (req: Request, res: Response) => {
    try {
        const data = await prisma.student.findMany();
        res.status(200).json({ message: "Get all students data", data, status: "success" });
    } catch (error) {
        console.error("Error while get the student data: ", error);
        res.status(500).json({ message: "Internal Server Error", status: "error" });
    }
}

const getStudentById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (!id) {
            res.status(400).json({ message: "Id is missing", status: "warn" });
            return;
        }
        const data = await prisma.student.findFirst({
            where: { id: Number(id) }, include: { marks: true }
        });

        if (!data) {
            res.status(400).json({ message: "Student not found", status: "warn" });
            return;
        }
        res.status(200).json({ message: "Get the student data by id", data, status: "success" });
    } catch (error) {
        console.error("Error while get the student data by id: ", error);
        res.status(500).json({ message: "Internal Server Error", status: "error" })
    }
}

const createStudent = async (req: Request, res: Response) => {
    const { name, email, age, parentId } = req.body;
    try {
        if (!name || !email || !age || !parentId) {
            res.status(400).json({ message: "All fields are required", status: "warn" });
            return;
        }

        const isEmailOrIdExist = await prisma.student.findFirst({
            where: {
                OR: [{ email }, { parentId }]
            }
        });

        if (isEmailOrIdExist) {
            res.status(400).json({ message: "Email or Parent ID already exists", status: "warn" });
            return;
        }

        const newStudent = await prisma.student.create({
            data: { name, email, age, parentId },
        });

        console.log({ newStudent });

        res.status(201).json({ message: "Data successfully uploaded", status: "success" });
    } catch (error) {
        console.log("error while create student: ", error);
        res.status(500).json({ error: 'Failed to create student' });
    }
};

const updateStudent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, age, parentId } = req.body;

    try {
        if (!id || !name || !email || !age || !parentId) {
            res.status(400).json({ message: "All fields are required", status: "warn" });
            return;
        }

        const updatedStudent = await prisma.student.update({
            where: { id: Number(id) },
            data: { name, email, age, parentId },
        });

        console.log({ updatedStudent });

        res.status(200).json({ message: "Student successfully updated", status: "success" });
    } catch (error) {
        res.status(400).json({ error: 'Failed to update student', details: error });
    }
};

const deleteStudent = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        if (!id) {
            res.status(400)
        }
        const deletedStudent = await prisma.student.delete({
            where: { id: Number(id) },
        });

        console.log({ deletedStudent });

        res.status(200).json({ message: "Student successfully deleted", status: "success" });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete student', details: error });
    }
};

export { getStudent, getStudentById, createStudent, updateStudent, deleteStudent };