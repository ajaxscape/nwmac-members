/*
  Warnings:

  - You are about to drop the column `amount_paid` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `bmfa_fee_family_junior` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `bmfa_fee_family_partner` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `bmfa_fee_junior` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `bmfa_fee_non_flyer` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `bmfa_fee_senior` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `club_fee_family` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `club_fee_junior` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `club_fee_senior` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `other` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `other_description` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "member_subscription" ADD COLUMN     "amount_paid" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "payment_method" TEXT;

-- AlterTable
ALTER TABLE "subscription" DROP COLUMN "amount_paid",
DROP COLUMN "bmfa_fee_family_junior",
DROP COLUMN "bmfa_fee_family_partner",
DROP COLUMN "bmfa_fee_junior",
DROP COLUMN "bmfa_fee_non_flyer",
DROP COLUMN "bmfa_fee_senior",
DROP COLUMN "club_fee_family",
DROP COLUMN "club_fee_junior",
DROP COLUMN "club_fee_senior",
DROP COLUMN "other",
DROP COLUMN "other_description",
DROP COLUMN "payment_method",
ADD COLUMN     "bmfa_family_junior" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bmfa_family_partner" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bmfa_junior" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bmfa_non_flyer" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bmfa_senior" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "club_family" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "club_junior" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "club_senior" INTEGER NOT NULL DEFAULT 0;
