BEGIN;

INSERT INTO "home" (name, user_id) VALUES
('La Radieuse', 1),
('La Coloc', 3)
;

INSERT INTO "generic_task" (name, value) VALUES
('Faire la poussière', 50),
('Passer l''aspirateur', 40),
('Laver par terre', 40),
('Sortir les poubelles', 20),
('Faire la vaisselle', 35),
('Nettoyer les toilettes', 60),
('Nettoyer la douche/baignoire', 50)
;

COMMIT;