-- Deploy c_du_props:FK to pg

BEGIN;

ALTER TABLE "user"
  ADD COLUMN house_id INT REFERENCES "house"(id);

COMMIT;
