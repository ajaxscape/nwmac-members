-- AlterTable
ALTER TABLE "member" ADD COLUMN     "caa_through_club" BOOLEAN,
ADD COLUMN     "flyer_id_required" BOOLEAN,
ADD COLUMN     "lead_family_member_id" INTEGER,
ADD COLUMN     "operator_id_required" BOOLEAN;

-- CreateTable
CREATE TABLE "family_member" (
    "member_id" INTEGER NOT NULL,
    "lead_family_member_id" INTEGER NOT NULL,

    CONSTRAINT "family_member_pkey" PRIMARY KEY ("member_id","lead_family_member_id")
);

-- AddForeignKey
ALTER TABLE "family_member" ADD CONSTRAINT "family_member_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
