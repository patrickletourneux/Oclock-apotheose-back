

ALTER TABLE "home" 
    ALTER COLUMN id 
        RESTART WITH 1;
		
INSERT INTO "home" (name, user_id) VALUES
('Maison', 1),
('Coloc', 2),
('Nos vacances à la montagne', 3);


ALTER TABLE "generic_task" 
    ALTER COLUMN id 
        RESTART WITH 1;
INSERT INTO "generic_task" (name, value) VALUES
('Faire la poussière', 45),
('Passer l''aspirateur', 40),
('Laver par terre', 40),
('Sortir les poubelles', 20),
('Faire la vaisselle', 25),
('Nettoyer les toilettes', 50),
('Laver la douche / baignoire', 15);



ALTER TABLE "home_task" 
    ALTER COLUMN id 
        RESTART WITH 1;
INSERT INTO "home_task" (name, value, home_id) VALUES
('Sortir les poubelles', 20, 1),
('Faire la vaisselle', 25, 2),
('Nourrir le chien', 10, 3),
('Sortir le chien', 30, 3),
('Sortir les poubelles', 20, 2),
('Faire la vaisselle', 25, 3),
('Sortir le chien', 30, 1),
('Sortir les poubelles', 20, 2),
('Faire la vaisselle', 25, 3),
('Sortir le chien', 30, 1);

ALTER TABLE "done_task" 
    ALTER COLUMN id 
        RESTART WITH 1;
INSERT INTO "done_task" (name, value, home_id, user_id) VALUES
('vaisselle', 20, 1, 1),
('Sortir les poubelles', 20, 1, 1),
('vaisselle', 20, 1, 3),
('Sortir les poubelles', 20, 1, 3),
('vaisselle', 20, 2, 2),
('Sortir les poubelles', 20, 2, 2);


ALTER TABLE "reward" 
    ALTER COLUMN id 
        RESTART WITH 1;
INSERT INTO "reward" (description, title, home_id) VALUES
('1 restaurant', 'Un restaurant', 2),
('1 massage', 'Un massage', 1);

ALTER TABLE "attributed_task" 
    ALTER COLUMN id 
        RESTART WITH 1;
INSERT INTO "attributed_task" (user_id, home_task_id) VALUES
(1, 1),
(1, 2),
(2, 3);

