BEGIN;

UPDATE "user" SET home_id = 1 WHERE id = 1;
UPDATE "user" SET home_id = 1 WHERE id = 2;
UPDATE "user" SET home_id = 2 WHERE id = 3;
UPDATE "user" SET home_id = 2 WHERE id = 4;
UPDATE "user" SET home_id = 2 WHERE id = 5;
UPDATE "user" SET home_id = 2 WHERE id = 6;


INSERT INTO "attributed_task" (user_id, home_task_id) VALUES
(2, 4),
(1, 3),
(1, 9),
(1, 10),
(4, 11),
(6, 13),
(6, 15),
(6, 17),
(5, 16)
;

COMMIT;