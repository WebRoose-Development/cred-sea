/*
  Warnings:

  - The `application_status` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `stage` column on the `Timeline` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ApplicationStages" AS ENUM ('fresh_application', 'approved_application', 'in_progress_application', 'documents_pending', 'under_credit_review', 'sales_complete', 'rejected_application', 'closed_application');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ProductTypes" ADD VALUE 'personal_loan';
ALTER TYPE "ProductTypes" ADD VALUE 'credit_card';
ALTER TYPE "ProductTypes" ADD VALUE 'home_loan';
ALTER TYPE "ProductTypes" ADD VALUE 'gold_loan';
ALTER TYPE "ProductTypes" ADD VALUE 'loan_against_property';
ALTER TYPE "ProductTypes" ADD VALUE 'bank_account_opening';
ALTER TYPE "ProductTypes" ADD VALUE 'vehicle_loan';
ALTER TYPE "ProductTypes" ADD VALUE 'emi_cards';
ALTER TYPE "ProductTypes" ADD VALUE 'cc_od_loan';
ALTER TYPE "ProductTypes" ADD VALUE 'gst_based_loan';
ALTER TYPE "ProductTypes" ADD VALUE 'government_loan';
ALTER TYPE "ProductTypes" ADD VALUE 'channel_financing';
ALTER TYPE "ProductTypes" ADD VALUE 'bill_discounting';
ALTER TYPE "ProductTypes" ADD VALUE 'machinery_loan';
ALTER TYPE "ProductTypes" ADD VALUE 'exported_loan';
ALTER TYPE "ProductTypes" ADD VALUE 'school_college_loan';
ALTER TYPE "ProductTypes" ADD VALUE 'hotel_loan';
ALTER TYPE "ProductTypes" ADD VALUE 'hospital_loan';
ALTER TYPE "ProductTypes" ADD VALUE 'tea_garden_loan';
ALTER TYPE "ProductTypes" ADD VALUE 'rice_mill_loan';
ALTER TYPE "ProductTypes" ADD VALUE 'education_loan';

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "application_status",
ADD COLUMN     "application_status" "ApplicationStages" NOT NULL DEFAULT 'fresh_application';

-- AlterTable
ALTER TABLE "Timeline" DROP COLUMN "stage",
ADD COLUMN     "stage" "ApplicationStages";

-- DropEnum
DROP TYPE "ApplicationStatus";
