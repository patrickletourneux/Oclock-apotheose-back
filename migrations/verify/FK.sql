-- Verify c_du_props:FK on pg

BEGIN;

SELECT home_id FROM "user" WHERE false;

ROLLBACK;
