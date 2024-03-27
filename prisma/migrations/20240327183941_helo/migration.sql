-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_corporateCorporateId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_productId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_created_by_user_uid_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_created_by_user_uid_fkey" FOREIGN KEY ("created_by_user_uid") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_corporateCorporateId_fkey" FOREIGN KEY ("corporateCorporateId") REFERENCES "Corporate"("corporateId") ON DELETE CASCADE ON UPDATE CASCADE;
