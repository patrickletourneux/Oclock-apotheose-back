INSERT INTO "user" (email, password, pseudonym, avatar_img,home_id) VALUES
('a@gmail.com','$2b$10$VVKQBHioCebL/QmXf7dx9O/zAZxnzfWZsuyWguxEnh7gvraPPzB/G','a','a',1),
('toto@imail.fr', '$2b$10$r1v5PX9PLnPiyABQdy3p3eqLZJBSD1Bl3h2j6wMEzkuu6oMA/XMeG', 'LeRigolo' , 'qkshflkqjhfl',2),
('tata@imail.fr', '$2b$10$sC.Rbz1hIXw/Lvpv.KxnaO3hfrcv1jccLFf1PB.LeQ/hD0wGusY0C', 'Bubulles', 'mlqkjfoiqlsfhkl',1),
('mimi@imail.com', '$2b$10$N.ip9uXV/EGasjXK79x6ZOM8Kl7BxzgrGOsvmflQ2sbeZOegjc3b6', 'Loulette', 'mlkrjmlqkjflkgl',2),
('tutu@imail.fr', '$2b$10$8bf0Rb3B9Vob5m9cd4oTj.iHZVojPGBldQgynm5tLwWZL57/yuxja', 'LeRigolo' , 'qkshflkqjhfl',1),
('titi@imail.fr', '$2b$10$5/yDyvdyojUVhfNO3RoH0.TLMUJDbN2pibIzgu5jHtCPz8G2ltjhi', 'Bubulles', 'mlqkjfoiqlsfhkl',2),
('mama@imail.com', '$2b$10$Mq8xTmenZ9dRUfHNM0VcLObTmgW0/5UPpY4QMuRZCqrRwM7Wn8tdC', 'Loulette', 'mlkrjmlqkjflkgl',1);

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
('Sortir le chien', 30, 3),
('Sortir les poubelles', 20, 2),
('Faire la vaisselle', 25, 3),
('Nourrir le chien', 10, 4),
('Sortir le chien', 30, 1),
('Sortir les poubelles', 20, 2),
('Faire la vaisselle', 25, 3),
('Nourrir le chien', 10, 4),
('Sortir le chien', 30, 1);

INSERT INTO "done_task" (name, value, home_id, user_id) VALUES
('vaisselle', 20, 1, 1),
('Sortir les poubelles', 20, 1, 2),
('vaisselle', 20, 2, 2),
('Sortir les poubelles', 20, 2, 2);

INSERT INTO "reward" (reward, title, home_id) VALUES
('1 restaurant', 'Un restaurant', 2),
('1 massage', 'Un massage', 1);


INSERT INTO "attributed_task" (user_id, home_task_id) VALUES
(1, 1),
(1, 2)
(2, 3);