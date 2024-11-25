/*
  Warnings:

  - You are about to drop the column `bmfa_fee` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `caa_reg` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `club_fee` on the `subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subscription" DROP COLUMN "bmfa_fee",
DROP COLUMN "caa_reg",
DROP COLUMN "club_fee",
ADD COLUMN     "bmfa_fee_family_junior" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bmfa_fee_family_partner" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bmfa_fee_junior" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bmfa_fee_non_flyer" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bmfa_fee_senior" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "caa_operator_registration" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "club_fee_family" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "club_fee_junior" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "club_fee_senior" INTEGER NOT NULL DEFAULT 0;
