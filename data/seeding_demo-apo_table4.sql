BEGIN;

INSERT INTO "home_task" (name, value, home_id) VALUES
('Passer le balais', 50, 1),
('Vider et nettoyer les pots de chambre', 75, 1),
('Nettoyer la vaisselle', 30, 1),
('Faire un repas', 35, 1),
('Aller au marché', 55, 1),
('Faire les poussières', 40, 1),
('S''occuper du compost', 30, 1),
('Changer les draps', 50, 1),
('Laver le linge au lavoir', 75, 1),
('Laver les draps au lavoir', 120, 1),
('Passer l''aspirateur', 40, 2),
('Faire la poussière', 50, 2),
('Laver par terre', 40, 2),
('Faire les courses', 55, 2),
('Mettre la table', 15, 2),
('Débarrasser la table', 25, 2),
('Faire la vaisselle', 35, 2),
('Nettoyer les toilettes', 60, 2),
('Nettoyer la cuisine', 45, 2),
('Nettoyer la douche/baignoire', 50, 2),
('Préparer à manger', 45, 2)
;

INSERT INTO "done_task" (name, value, home_id, user_id) VALUES
('Faire un repas', 35, 1, 1),
('Aller au marché', 55, 1, 2),
('Faire un repas', 35, 1, 2),
('Passer le balais', 50, 1, 2),
('Laver le linge au lavoir', 75, 1, 1),
('Faire un repas', 35, 1, 1),
('Mettre la table', 15, 2, 4),
('Débarrasser la table', 25, 2, 5),
('Mettre la table', 15, 2, 6),
('Faire la vaisselle', 40, 2, 4 ),
('Nettoyer la cuisine', 45, 2, 3),
('Préparer à manger', 45, 2, 3)
;

INSERT INTO "reward" (title, description, home_id) VALUES
('Un cadeau', 'Un cadeau pour compléter la collection du vainqueur', 1),
('Un bisou', 'Les perdants devront tous faire un bisou sur la main (gauche) du gagnant', 2)
;

INSERT INTO "attributed_task" (user_id, home_task_id) VALUES
(2, 4),
(1, 3),
(1, 9),
(1, 10),
(4, 11),
(6, 13),
(6, 15),
(6, 17),
(5, 16)
;


COMMIT;