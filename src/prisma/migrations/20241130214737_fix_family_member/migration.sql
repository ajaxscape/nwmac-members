/*
  Warnings:

  - The primary key for the `family_member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `member_id` on the `family_member` table. All the data in the column will be lost.
  - Added the required column `family_member_id` to the `family_member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "family_member" DROP CONSTRAINT "family_member_member_id_fkey";

-- AlterTable
ALTER TABLE "family_member" DROP CONSTRAINT "family_member_pkey",
DROP COLUMN "member_id",
ADD COLUMN     "family_member_id" INTEGER NOT NULL,
ADD CONSTRAINT "family_member_pkey" PRIMARY KEY ("family_member_id", "lead_family_member_id");

-- AddForeignKey
ALTER TABLE "family_member" ADD CONSTRAINT "family_member_family_member_id_fkey" FOREIGN KEY ("family_member_id") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
