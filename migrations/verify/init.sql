-- Verify c_du_props:init on pg

BEGIN;

SELECT * FROM "user" WHERE false;

SELECT * FROM "house" WHERE false;

SELECT * FROM "generic_task" WHERE false;

SELECT * FROM "house_task" WHERE false;

SELECT * FROM "done_task" WHERE false;

SELECT * FROM "reward" WHERE false;

SELECT * FROM "attributed_task" WHERE false;

ROLLBACK;
