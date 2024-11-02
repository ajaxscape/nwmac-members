

-- Insert Power Fixed Wing achievements
WITH pfw_category AS (
INSERT
INTO public."achievement_category" (title, "is_endorsement", created_at, updated_at)
VALUES ('Power Fixed Wing', DEFAULT, DEFAULT, DEFAULT)
    RETURNING id
    )

INSERT INTO public."achievement" (achievement_category_id, title, "code", created_at, updated_at)
VALUES ((SELECT id FROM pfw_category), 'Basic Proficiency Certificate', 'BP(FW)', DEFAULT, DEFAULT),
    ((SELECT id FROM pfw_category), 'A Certificate', 'A(FW)', DEFAULT, DEFAULT),
    ((SELECT id FROM pfw_category), 'B Certificate', 'B(FW)', DEFAULT, DEFAULT),
    ((SELECT id FROM pfw_category), 'Club Examiner', 'E(FW)', DEFAULT, DEFAULT);

-- Insert Helicopter achievements
WITH h_category AS (
INSERT
INTO public."achievement_category" (id, title, "is_endorsement", created_at, updated_at)
VALUES (DEFAULT, 'Helicopter', DEFAULT, DEFAULT, DEFAULT)
    RETURNING id
    )

INSERT INTO public."achievement" (achievement_category_id, title, "code", created_at, updated_at)
VALUES ((SELECT id FROM h_category), 'Basic Proficiency Certificate', 'BP(H)', DEFAULT, DEFAULT),
    ((SELECT id FROM h_category), 'A Certificate', 'A(H)', DEFAULT, DEFAULT),
    ((SELECT id FROM h_category), 'B Certificate', 'B(H)', DEFAULT, DEFAULT),
    ((SELECT id FROM h_category), 'Club Examiner', 'E(H)', DEFAULT, DEFAULT);

-- Insert Multi-Rotor achievements
WITH mr_category AS (
INSERT
INTO public."achievement_category" (id, title, "is_endorsement", created_at, updated_at)
VALUES (DEFAULT, 'Multi-Rotor', DEFAULT, DEFAULT, DEFAULT)
    RETURNING id
    )

INSERT INTO public."achievement" (achievement_category_id, title, "code", created_at, updated_at)
VALUES ((SELECT id FROM mr_category), 'Basic Proficiency Certificate', 'BP(MR)', DEFAULT, DEFAULT),
    ((SELECT id FROM mr_category), 'A Certificate', 'A(MR)', DEFAULT, DEFAULT),
    ((SELECT id FROM mr_category), 'B Certificate', 'B(MR)', DEFAULT, DEFAULT);

-- Insert Silent Flight Thermal achievements
WITH sft_category AS (
INSERT
INTO public."achievement_category" (id, title, "is_endorsement", created_at, updated_at)
VALUES (DEFAULT, 'Silent Flight Thermal', DEFAULT, DEFAULT, DEFAULT)
    RETURNING id
    )

INSERT INTO public."achievement" (achievement_category_id, title, "code", created_at, updated_at)
VALUES ((SELECT id FROM sft_category), 'A Certificate', 'A(SFT)', DEFAULT, DEFAULT),
    ((SELECT id FROM sft_category), 'B Certificate', 'B(SFT)', DEFAULT, DEFAULT);

-- Insert Silent Flight Slope achievements
WITH sfs_category AS (
INSERT
INTO public."achievement_category" (id, title, "is_endorsement", created_at, updated_at)
VALUES (DEFAULT, 'Silent Flight Slope', DEFAULT, DEFAULT, DEFAULT)
    RETURNING id
    )

INSERT INTO public."achievement" (achievement_category_id, title, "code", created_at, updated_at)
VALUES ((SELECT id FROM sfs_category), 'A Certificate', 'A(SFS)', DEFAULT, DEFAULT),
    ((SELECT id FROM sfs_category), 'B Certificate', 'B(SFS)', DEFAULT, DEFAULT);

-- Insert Silent Flight Electric achievements
WITH sfe_category AS (
INSERT
INTO public."achievement_category" (id, title, "is_endorsement", created_at, updated_at)
VALUES (DEFAULT, 'Silent Flight Electric', DEFAULT, DEFAULT, DEFAULT)
    RETURNING id
    )

INSERT INTO public."achievement" (achievement_category_id, title, "code", created_at, updated_at)
VALUES ((SELECT id FROM sfe_category), 'A Certificate', 'A(SFE)', DEFAULT, DEFAULT),
    ((SELECT id FROM sfe_category), 'B Certificate', 'B(SFE)', DEFAULT, DEFAULT);
