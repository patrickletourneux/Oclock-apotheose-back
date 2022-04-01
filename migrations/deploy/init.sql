-- Deploy c_du_props:init to pg

BEGIN;

CREATE TABLE "user" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  pseudonym TEXT NOT NULL,
  avatar_img TEXT,
  created_at TIMESTAMPTZ NOW(),
  house_id INT REFERENCES house(id) /* DEFAULT NULL ???*/
);

CREATE TABLE "house" ( 
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  /*password TEXT,*/
  created_at TIMESTAMPTZ NOW(),
  user_id REFERENCES user(id) /* DEFAULT NULL ???*/
);

/* CREATE TABLE "generic_task" (INT
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  value INT NOT NULL,
  created_at TIMESTAMPTZ NOW()
);
*/

CREATE TABLE "house_task" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  value INT NOT NULL,
  created_at TIMESTAMPTZ NOW(),
  house_id INT REFERENCES house(id)
);

CREATE TABLE "done_task" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  value INT NOT NULL,
  created_at TIMESTAMPTZ NOW(),
  house_id INT REFERENCES house(id), /* J'ai mis une foreign key d'après les instructions du MLD de O'Clock*/
  user_id INT REFERENCES user(id) /*idem*/
);

CREATE TABLE "competition" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  reward TEXT DEFAULT NULL,
  title TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ NOW()
);

CREATE TABLE "attribue" (
  user_id INT REFERENCES user(id),
  house_id INT REFERENCES house(id)
);

COMMIT;
