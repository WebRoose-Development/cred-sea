-- CreateEnum
CREATE TYPE "ProductTypes" AS ENUM ('business_loan', 'insta_loan');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "productId" INTEGER;

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_type" "ProductTypes" NOT NULL DEFAULT 'business_loan',
    "corporate_payout" DECIMAL(65,30) NOT NULL,
    "employee_payout" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
