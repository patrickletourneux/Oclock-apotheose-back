-- Verify c_du_props:init on pg

BEGIN;

SELECT * FROM "user" WHERE false;

SELECT * FROM "home" WHERE false;

SELECT * FROM "generic_task" WHERE false;

SELECT * FROM "home_task" WHERE false;

SELECT * FROM "done_task" WHERE false;

SELECT * FROM "reward" WHERE false;

SELECT * FROM "attributed_task" WHERE false;

ROLLBACK;
