/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[aadhar]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `advisorUserId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agentUserId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corporateCorporateId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aadhar` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "advisorUserId" TEXT NOT NULL,
ADD COLUMN     "agentUserId" TEXT NOT NULL,
ADD COLUMN     "corporateCorporateId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "aadhar" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "created_by_user_uid" TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("uid");

-- CreateTable
CREATE TABLE "ProductPayout" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "advisorUserId" TEXT NOT NULL,
    "productPayout" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "ProductPayout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_aadhar_key" ON "Customer"("aadhar");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_created_by_user_uid_fkey" FOREIGN KEY ("created_by_user_uid") REFERENCES "User"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_advisorUserId_fkey" FOREIGN KEY ("advisorUserId") REFERENCES "Advisor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_agentUserId_fkey" FOREIGN KEY ("agentUserId") REFERENCES "Agent"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_corporateCorporateId_fkey" FOREIGN KEY ("corporateCorporateId") REFERENCES "Corporate"("corporateId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPayout" ADD CONSTRAINT "ProductPayout_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPayout" ADD CONSTRAINT "ProductPayout_advisorUserId_fkey" FOREIGN KEY ("advisorUserId") REFERENCES "Advisor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
