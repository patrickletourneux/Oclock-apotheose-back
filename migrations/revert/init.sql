-- Revert c_du_props:init from pg

BEGIN;

DROP TABLE "attributed_task", "reward", "done_task", "home_task", "generic_task","home", "user";

COMMIT;
