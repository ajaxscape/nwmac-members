-- AlterTable
ALTER TABLE "member_subscription" ADD COLUMN     "bmfa_printed_magazine" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "subscription" ADD COLUMN     "bmfa_printed_magazine" INTEGER NOT NULL DEFAULT 0;
