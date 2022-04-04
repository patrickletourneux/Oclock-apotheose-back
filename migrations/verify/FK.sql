-- Verify c_du_props:FK on pg

BEGIN;

SELECT house_id FROM "user" WHERE false;

ROLLBACK;
