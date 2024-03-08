-- CreateEnum
CREATE TYPE "ProductTypes" AS ENUM ('business_loan', 'insta_loan');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('active', 'deactive', 'expired');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'deactive', 'expired');

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('admin', 'corporate', 'agency', 'user');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "whatsapp" TEXT,
    "profile_link" TEXT,
    "role" "Roles" NOT NULL DEFAULT 'user',
    "referred_by_uid" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "application_status" "ApplicationStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER NOT NULL,
    "added_by_user_uid" TEXT NOT NULL,
    "sm_user_id" TEXT,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timeline" (
    "id" SERIAL NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "loan_id" TEXT,
    "amount" BIGINT,
    "stage" "ApplicationStatus",

    CONSTRAINT "Timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "applicationId" INTEGER NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "pincode" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("applicationId")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "logo" TEXT,
    "product_link" TEXT NOT NULL,
    "product_type" "ProductTypes" NOT NULL DEFAULT 'business_loan',
    "product_status" "Status" NOT NULL DEFAULT 'active',
    "payout" DECIMAL(65,30) NOT NULL,
    "imported_payout" DECIMAL(65,30),
    "employee_payout" DECIMAL(65,30),
    "is_live" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "product_owner_uid" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Imported" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_applicationId_key" ON "Customer"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "_Imported_AB_unique" ON "_Imported"("A", "B");

-- CreateIndex
CREATE INDEX "_Imported_B_index" ON "_Imported"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referred_by_uid_fkey" FOREIGN KEY ("referred_by_uid") REFERENCES "User"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_added_by_user_uid_fkey" FOREIGN KEY ("added_by_user_uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_sm_user_id_fkey" FOREIGN KEY ("sm_user_id") REFERENCES "User"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timeline" ADD CONSTRAINT "Timeline_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_product_owner_uid_fkey" FOREIGN KEY ("product_owner_uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Imported" ADD CONSTRAINT "_Imported_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Imported" ADD CONSTRAINT "_Imported_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
