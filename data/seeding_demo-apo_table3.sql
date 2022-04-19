BEGIN;

UPDATE "user" SET home_id = 1 WHERE id = 1;
UPDATE "user" SET home_id = 1 WHERE id = 2;
UPDATE "user" SET home_id = 2 WHERE id = 3;
UPDATE "user" SET home_id = 2 WHERE id = 4;
UPDATE "user" SET home_id = 2 WHERE id = 5;
UPDATE "user" SET home_id = 2 WHERE id = 6;



COMMIT;