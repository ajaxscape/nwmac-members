/*
  Warnings:

  - You are about to drop the `_AchievementToMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AchievementToMember" DROP CONSTRAINT "_AchievementToMember_A_fkey";

-- DropForeignKey
ALTER TABLE "_AchievementToMember" DROP CONSTRAINT "_AchievementToMember_B_fkey";

-- DropTable
DROP TABLE "_AchievementToMember";

-- CreateTable
CREATE TABLE "member_achievement" (
    "member_id" INTEGER NOT NULL,
    "achievement_id" INTEGER NOT NULL,

    CONSTRAINT "member_achievement_pkey" PRIMARY KEY ("member_id","achievement_id")
);

-- AddForeignKey
ALTER TABLE "member_achievement" ADD CONSTRAINT "member_achievement_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member_achievement" ADD CONSTRAINT "member_achievement_achievement_id_fkey" FOREIGN KEY ("achievement_id") REFERENCES "achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
