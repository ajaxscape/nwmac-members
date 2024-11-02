-- AlterTable
ALTER TABLE "member" ADD COLUMN     "achievement_id" INTEGER;

-- CreateTable
CREATE TABLE "achievement_category" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(40),
    "is_endorsement" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,

    CONSTRAINT "achievement_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievement" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(40),
    "code" VARCHAR(10),
    "achievement_category_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,

    CONSTRAINT "achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AchievementToMember" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AchievementToMember_AB_unique" ON "_AchievementToMember"("A", "B");

-- CreateIndex
CREATE INDEX "_AchievementToMember_B_index" ON "_AchievementToMember"("B");

-- AddForeignKey
ALTER TABLE "achievement" ADD CONSTRAINT "FK_achievement_achievement_category_id" FOREIGN KEY ("achievement_category_id") REFERENCES "achievement_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_AchievementToMember" ADD CONSTRAINT "_AchievementToMember_A_fkey" FOREIGN KEY ("A") REFERENCES "achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AchievementToMember" ADD CONSTRAINT "_AchievementToMember_B_fkey" FOREIGN KEY ("B") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
