INSERT INTO "user" (email, password, pseudonym, avatar_img) VALUES
('a@gmail.com','$2b$10$VVKQBHioCebL/QmXf7dx9O/zAZxnzfWZsuyWguxEnh7gvraPPzB/G','a','a'),
('toto@imail.fr', '$2b$10$r1v5PX9PLnPiyABQdy3p3eqLZJBSD1Bl3h2j6wMEzkuu6oMA/XMeG', 'LeRigolo' , 'qkshflkqjhfl'),
('tata@imail.fr', '$2b$10$sC.Rbz1hIXw/Lvpv.KxnaO3hfrcv1jccLFf1PB.LeQ/hD0wGusY0C', 'Bubulles', 'mlqkjfoiqlsfhkl'),
('mimi@imail.com', '$2b$10$N.ip9uXV/EGasjXK79x6ZOM8Kl7BxzgrGOsvmflQ2sbeZOegjc3b6', 'Loulette', 'mlkrjmlqkjflkgl'),
('tutu@imail.fr', '$2b$10$8bf0Rb3B9Vob5m9cd4oTj.iHZVojPGBldQgynm5tLwWZL57/yuxja', 'LeRigolo' , 'qkshflkqjhfl'),
('titi@imail.fr', '$2b$10$5/yDyvdyojUVhfNO3RoH0.TLMUJDbN2pibIzgu5jHtCPz8G2ltjhi', 'Bubulles', 'mlqkjfoiqlsfhkl'),
('mama@imail.com', '$2b$10$Mq8xTmenZ9dRUfHNM0VcLObTmgW0/5UPpY4QMuRZCqrRwM7Wn8tdC', 'Loulette', 'mlkrjmlqkjflkgl');

INSERT INTO "house" (name, user_id) VALUES
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

INSERT INTO "house_task" (name, value, house_id) VALUES
('Sortir les poubelles', 20, 1),
('Faire la vaisselle', 25, 2),
('Nourrir le chien', 10, 3),
('Sortir le chien', 30, 3);

INSERT INTO "done_task" (name, value, house_id, user_id) VALUES
('Sortir les poubelles', 20, 1, 2);

INSERT INTO "reward" (reward, title, house_id) VALUES
('1 massage', 'Un massage', 1);

INSERT INTO "attributed_task" (user_id, house_id) VALUES
(2, 3);