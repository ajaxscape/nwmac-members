/*
  Warnings:

  - You are about to drop the column `achievement_id` on the `member` table. All the data in the column will be lost.
  - The `non_club_contact` column on the `member` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "member" DROP COLUMN "achievement_id",
ADD COLUMN     "age_group" VARCHAR(10),
ADD COLUMN     "bmfa_through_club" BOOLEAN,
ALTER COLUMN "operator_id" SET DATA TYPE TEXT,
DROP COLUMN "non_club_contact",
ADD COLUMN     "non_club_contact" BOOLEAN;
