/*
  Warnings:

  - You are about to drop the column `club_family` on the `subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subscription" DROP COLUMN "club_family",
ADD COLUMN     "bmfa_members_card" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "club_family_junior" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "club_family_partner" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "club_family_senior" INTEGER NOT NULL DEFAULT 0;
