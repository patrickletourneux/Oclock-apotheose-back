-- Revert c_du_props:init from pg

BEGIN;

DROP TABLE "attributed_task", "reward", "done_task", "house_task", "generic_task", "house", "user";

COMMIT;
