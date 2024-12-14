

-- Insert Registration Competency achievements
WITH rc_category AS (
    INSERT
        INTO public."achievement_category" (title, "is_endorsement", created_at, updated_at)
            VALUES ('Registration Competency', DEFAULT, DEFAULT, DEFAULT)
            RETURNING id
)

INSERT INTO public."achievement" (achievement_category_id, title, "code", created_at, updated_at)
VALUES ((SELECT id FROM rc_category), 'Registration Competency Certificate', 'RCC', DEFAULT, DEFAULT);