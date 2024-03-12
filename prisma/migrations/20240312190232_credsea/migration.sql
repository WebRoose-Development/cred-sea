/*
  Warnings:

  - The values [admin,user] on the enum `Roles` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `added_by_user_uid` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `sm_user_id` on the `Application` table. All the data in the column will be lost.
  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `applicationId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `employee_payout` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imported_payout` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_owner_uid` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `referred_by_uid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_Imported` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[pan]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pan` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `corporateUserId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Roles_new" AS ENUM ('credsea', 'corporate', 'agency', 'agents', 'sm');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Roles_new" USING ("role"::text::"Roles_new");
ALTER TYPE "Roles" RENAME TO "Roles_old";
ALTER TYPE "Roles_new" RENAME TO "Roles";
DROP TYPE "Roles_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'corporate';
COMMIT;

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_added_by_user_uid_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_sm_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_product_owner_uid_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_referred_by_uid_fkey";

-- DropForeignKey
ALTER TABLE "_Imported" DROP CONSTRAINT "_Imported_A_fkey";

-- DropForeignKey
ALTER TABLE "_Imported" DROP CONSTRAINT "_Imported_B_fkey";

-- DropIndex
DROP INDEX "Customer_applicationId_key";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "added_by_user_uid",
DROP COLUMN "sm_user_id",
ADD COLUMN     "customerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
DROP COLUMN "applicationId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "pan" TEXT NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "employee_payout",
DROP COLUMN "imported_payout",
DROP COLUMN "product_owner_uid",
ADD COLUMN     "corporateUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "referred_by_uid",
ALTER COLUMN "role" SET DEFAULT 'corporate';

-- DropTable
DROP TABLE "_Imported";

-- CreateTable
CREATE TABLE "Corporate" (
    "userId" TEXT NOT NULL,
    "corporate_name" TEXT NOT NULL,
    "corporate_logo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Corporate_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Advisor" (
    "userId" TEXT NOT NULL,
    "corporateUserId" TEXT NOT NULL,
    "advisor_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Advisor_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Agent" (
    "userId" TEXT NOT NULL,
    "corporateUserId" TEXT NOT NULL,
    "advisorUserId" TEXT NOT NULL,
    "agent_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "SM" (
    "userId" TEXT NOT NULL,
    "corporateUserId" TEXT NOT NULL,

    CONSTRAINT "SM_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Corporate_userId_key" ON "Corporate"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Advisor_userId_key" ON "Advisor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_userId_key" ON "Agent"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SM_userId_key" ON "SM"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_pan_key" ON "Customer"("pan");

-- AddForeignKey
ALTER TABLE "Corporate" ADD CONSTRAINT "Corporate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advisor" ADD CONSTRAINT "Advisor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advisor" ADD CONSTRAINT "Advisor_corporateUserId_fkey" FOREIGN KEY ("corporateUserId") REFERENCES "Corporate"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_corporateUserId_fkey" FOREIGN KEY ("corporateUserId") REFERENCES "Corporate"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_advisorUserId_fkey" FOREIGN KEY ("advisorUserId") REFERENCES "Advisor"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SM" ADD CONSTRAINT "SM_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SM" ADD CONSTRAINT "SM_corporateUserId_fkey" FOREIGN KEY ("corporateUserId") REFERENCES "Corporate"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_corporateUserId_fkey" FOREIGN KEY ("corporateUserId") REFERENCES "Corporate"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
