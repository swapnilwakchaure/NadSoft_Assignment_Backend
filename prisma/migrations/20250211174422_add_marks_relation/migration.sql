/*
  Warnings:

  - A unique constraint covering the columns `[parentId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Student_parentId_key" ON "Student"("parentId");
