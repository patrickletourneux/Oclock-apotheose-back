-- Revert c_du_props:FK from pg

BEGIN;

ALTER TABLE "user" 
  DROP COLUMN home_id;

COMMIT;
