-- CreateTable
CREATE TABLE "member" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(30),
    "middle_name" VARCHAR(30),
    "last_name" VARCHAR(30),
    "preferred_name" VARCHAR(30),
    "email" TEXT,
    "mobile" VARCHAR(30),
    "membership_number" INTEGER,
    "bmfa_number" INTEGER,
    "flyer_id" INTEGER,
    "operator_id" INTEGER,
    "address_id" INTEGER,
    "non_club_contact" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "address_line_1" VARCHAR(50),
    "address_line_2" VARCHAR(50),
    "town" VARCHAR(30),
    "county" VARCHAR(30),
    "postcode" VARCHAR(10),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "member_email_key" ON "member"("email");

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "FK_member_address_id" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
