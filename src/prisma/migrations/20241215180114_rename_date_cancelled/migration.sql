/*
  Warnings:

  - You are about to drop the column `cancelled` on the `member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "member" DROP COLUMN "cancelled",
ADD COLUMN     "date-cancelled" TIMESTAMP(6);
