import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createMark = async (req: Request, res: Response) => {
    const { subject, score, studentId } = req.body;

    try {
        if (!subject || !score || !studentId) {
            res.status(400).json({ message: "All fields are required", status: "warn" });
            return;
        }

        const newMark = await prisma.mark.create({
            data: { subject, score, studentId },
        });

        console.log({ newMark });

        res.status(201).json({ message: "Mark created successfully", status: "success" });
    } catch (error) {
        console.error("Error creating mark:", error);
        res.status(500).json({ message: "Failed to create mark", status: "error", error: error });
    }
};

const getMarksByStudentId = async (req: Request, res: Response) => {
    const { studentId } = req.params;

    try {
        if (!studentId) {
            res.status(400).json({ message: "Student ID is required", status: "warn" });
            return;
        }

        const marks = await prisma.mark.findMany({
            where: { studentId: Number(studentId) },
        });

        res.status(200).json({ message: "Marks retrieved successfully", data: marks, status: "success" });
    } catch (error) {
        console.error("Error retrieving marks:", error);
        res.status(500).json({ message: "Failed to retrieve marks", status: "error", details: error });
    }
};

const updateMarkById = async (req: Request, res: Response) => {
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

        const updatedMark = await prisma.mark.update({
            where: { id: Number(id) },
            data: { subject, score },
        });

        console.log({ updatedMark });

        res.status(200).json({ message: "Mark updated successfully", status: "success" });
    } catch (error) {
        console.error("Error updating mark:", error);
        res.status(500).json({ message: "Failed to update mark", status: "error", details: error });
    }
};

const deleteMarkById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        if (!id) {
            res.status(400).json({ message: "Id is missing", status: "warn" });
        }
        const deletedMark = await prisma.mark.delete({
            where: { id: Number(id) },
        });

        console.log({ deletedMark });

        res.status(200).json({ message: "Mark deleted successfully", status: "success" });
    } catch (error) {
        console.error("Error deleting mark:", error);
        res.status(500).json({ message: "Failed to delete mark", status: "error", details: error });
    }
};


export { getMarksByStudentId, createMark, updateMarkById, deleteMarkById };