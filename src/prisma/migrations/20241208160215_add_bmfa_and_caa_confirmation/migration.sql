-- AlterTable
ALTER TABLE "member_subscription" ADD COLUMN     "confirmedWithBmfa" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "confirmedWithCaa" BOOLEAN NOT NULL DEFAULT false;
