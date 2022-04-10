BEGIN;

ALTER TABLE "user" 
    ALTER COLUMN id 
        RESTART WITH 1;
		
INSERT INTO "user" (email, password, pseudonym, avatar_img) VALUES
('a@gmail.com','$2b$10$VVKQBHioCebL/QmXf7dx9O/zAZxnzfWZsuyWguxEnh7gvraPPzB/G','a','a'),
('toto@imail.fr', '$2b$10$r1v5PX9PLnPiyABQdy3p3eqLZJBSD1Bl3h2j6wMEzkuu6oMA/XMeG', 'LeRigolo' , 'qkshflkqjhfl'),
('tata@imail.fr', '$2b$10$sC.Rbz1hIXw/Lvpv.KxnaO3hfrcv1jccLFf1PB.LeQ/hD0wGusY0C', 'Bubulles', 'mlqkjfoiqlsfhkl'),
('mimi@imail.com', '$2b$10$N.ip9uXV/EGasjXK79x6ZOM8Kl7BxzgrGOsvmflQ2sbeZOegjc3b6', 'Loulette', 'mlkrjmlqkjflkgl'),
('tutu@imail.fr', '$2b$10$8bf0Rb3B9Vob5m9cd4oTj.iHZVojPGBldQgynm5tLwWZL57/yuxja', 'LeRigolo' , 'qkshflkqjhfl'),
('titi@imail.fr', '$2b$10$5/yDyvdyojUVhfNO3RoH0.TLMUJDbN2pibIzgu5jHtCPz8G2ltjhi', 'Bubulles', 'mlqkjfoiqlsfhkl'),
('mama@imail.com', '$2b$10$Mq8xTmenZ9dRUfHNM0VcLObTmgW0/5UPpY4QMuRZCqrRwM7Wn8tdC', 'Loulette', 'mlkrjmlqkjflkgl');

COMMIT;