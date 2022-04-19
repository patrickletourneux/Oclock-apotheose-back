BEGIN;

INSERT INTO "user" (email, password, pseudonym) VALUES
('marie.curie@mail.fr', 'm', 'Marie'),
('pierre.curie@mail.fr', 'p', 'Pierre'),
('maëlle58@mail.com', 'm', 'La Marquise'),
('tibault92@gmail.com', 't', 'Titi'),
('Sofia.Italia@mail.it', 's', 'La Ragazza'),
('Mat.Del@mail.com', 'm', 'Mat')
;

COMMIT;