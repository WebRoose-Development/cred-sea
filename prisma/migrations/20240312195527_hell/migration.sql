/*
  Warnings:

  - The primary key for the `Corporate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Corporate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[corporateId]` on the table `Corporate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `corporateId` to the `Corporate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Advisor" DROP CONSTRAINT "Advisor_corporateUserId_fkey";

-- DropForeignKey
ALTER TABLE "Agent" DROP CONSTRAINT "Agent_corporateUserId_fkey";

-- DropForeignKey
ALTER TABLE "Corporate" DROP CONSTRAINT "Corporate_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_corporateUserId_fkey";

-- DropForeignKey
ALTER TABLE "SM" DROP CONSTRAINT "SM_corporateUserId_fkey";

-- DropIndex
DROP INDEX "Corporate_userId_key";

-- AlterTable
ALTER TABLE "Corporate" DROP CONSTRAINT "Corporate_pkey",
DROP COLUMN "userId",
ADD COLUMN     "corporateId" TEXT NOT NULL,
ADD CONSTRAINT "Corporate_pkey" PRIMARY KEY ("corporateId");

-- CreateIndex
CREATE UNIQUE INDEX "Corporate_corporateId_key" ON "Corporate"("corporateId");

-- AddForeignKey
ALTER TABLE "Corporate" ADD CONSTRAINT "Corporate_corporateId_fkey" FOREIGN KEY ("corporateId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advisor" ADD CONSTRAINT "Advisor_corporateUserId_fkey" FOREIGN KEY ("corporateUserId") REFERENCES "Corporate"("corporateId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_corporateUserId_fkey" FOREIGN KEY ("corporateUserId") REFERENCES "Corporate"("corporateId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SM" ADD CONSTRAINT "SM_corporateUserId_fkey" FOREIGN KEY ("corporateUserId") REFERENCES "Corporate"("corporateId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_corporateUserId_fkey" FOREIGN KEY ("corporateUserId") REFERENCES "Corporate"("corporateId") ON DELETE RESTRICT ON UPDATE CASCADE;
