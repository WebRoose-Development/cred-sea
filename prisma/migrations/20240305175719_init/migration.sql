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
    "role" "Roles" NOT NULL DEFAULT 'user',
    "referred_by_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "logo" TEXT,
    "corporate_uid" TEXT NOT NULL,
    "deal_with_uid" TEXT NOT NULL,
    "application_status" "Status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referral" (
    "id" SERIAL NOT NULL,
    "created_by_id" TEXT NOT NULL,
    "referral_link" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Referral_created_by_id_key" ON "Referral"("created_by_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referred_by_id_fkey" FOREIGN KEY ("referred_by_id") REFERENCES "Referral"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_corporate_uid_fkey" FOREIGN KEY ("corporate_uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_deal_with_uid_fkey" FOREIGN KEY ("deal_with_uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
