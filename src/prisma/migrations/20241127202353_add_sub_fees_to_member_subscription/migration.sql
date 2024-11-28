-- AlterTable
ALTER TABLE "member_subscription" ADD COLUMN     "bmfa_family_junior" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bmfa_family_partner" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bmfa_junior" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bmfa_non_flyer" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bmfa_senior" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "caa_operator_registration" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "club_family" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "club_junior" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "club_senior" INTEGER NOT NULL DEFAULT 0;
