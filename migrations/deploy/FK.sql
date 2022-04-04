-- Deploy c_du_props:FK to pg

BEGIN;

ALTER TABLE "user"
  ADD COLUMN home_id INT REFERENCES "home"(id);

COMMIT;
