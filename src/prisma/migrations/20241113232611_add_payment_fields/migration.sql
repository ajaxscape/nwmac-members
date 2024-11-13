-- AlterTable
ALTER TABLE "subscription" ADD COLUMN     "amount_paid" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "other" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "other_description" TEXT,
ADD COLUMN     "payment_method" TEXT;
