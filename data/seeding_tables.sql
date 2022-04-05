INSERT INTO "user" (email, password, pseudonym, avatar_img) VALUES 
('toto@imail.fr', 'blabla', 'LeRigolo' , 'qkshflkqjhfl'),
('tata@imail.fr', 'Heuuuu', 'Bubulles', 'mlqkjfoiqlsfhkl'),
('mimi@imail.com', 'Hello', 'Loulette', 'mlkrjmlqkjflkgl'),
('tutu@imail.fr', 'blabla', 'LeRigolo' , 'qkshflkqjhfl'),
('titi@imail.fr', 'Heuuuu', 'Bubulles', 'mlqkjfoiqlsfhkl'),
('mama@imail.com', 'Hello', 'Loulette', 'mlkrjmlqkjflkgl');

INSERT INTO "home" (name, user_id) VALUES
('Maison', 2),
('Coloc', 1),
('Nos vacances à la montagne', 2);

INSERT INTO "generic_task" (name, value) VALUES
('Faire la poussière', 45),
('Passer l''aspirateur', 40),
('Laver par terre', 40),
('Sortir les poubelles', 20),
('Faire la vaisselle', 25),
('Nettoyer les toilettes', 50),
('Laver la douche / baignoire', 15);

INSERT INTO "home_task" (name, value, home_id) VALUES
('Sortir les poubelles', 20, 1),
('Faire la vaisselle', 25, 2),
('Nourrir le chien', 10, 3),
('Sortir le chien', 30, 3);

INSERT INTO "done_task" (name, value, home_id, user_id) VALUES
('Sortir les poubelles', 20, 1, 2);

INSERT INTO "reward" (reward, title, home_id) VALUES
('1 massage', 'Un massage', 1);

INSERT INTO "attributed_task" (user_id, home_task_id) VALUES
(2, 3);