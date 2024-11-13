-- AlterTable
ALTER TABLE "member" ADD COLUMN     "committee_role_id" INTEGER,
ADD COLUMN     "membership_year" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "member_achievement" ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
ADD COLUMN     "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone;

-- CreateTable
CREATE TABLE "committee_role" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(40) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,

    CONSTRAINT "committee_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member_committee_role" (
    "member_id" INTEGER NOT NULL,
    "committee_role_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,

    CONSTRAINT "member_committee_role_pkey" PRIMARY KEY ("member_id","committee_role_id")
);

-- CreateTable
CREATE TABLE "subscription" (
    "year" INTEGER NOT NULL,
    "club_fee" INTEGER NOT NULL DEFAULT 0,
    "bmfa_fee" INTEGER NOT NULL DEFAULT 0,
    "caa_reg" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("year")
);

-- CreateTable
CREATE TABLE "member_subscription" (
    "member_id" INTEGER NOT NULL,
    "subscription_year" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,

    CONSTRAINT "member_subscription_pkey" PRIMARY KEY ("member_id","subscription_year")
);

-- AddForeignKey
ALTER TABLE "member_committee_role" ADD CONSTRAINT "member_committee_role_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member_committee_role" ADD CONSTRAINT "member_committee_role_committee_role_id_fkey" FOREIGN KEY ("committee_role_id") REFERENCES "committee_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member_subscription" ADD CONSTRAINT "member_subscription_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member_subscription" ADD CONSTRAINT "member_subscription_subscription_year_fkey" FOREIGN KEY ("subscription_year") REFERENCES "subscription"("year") ON DELETE RESTRICT ON UPDATE CASCADE;
