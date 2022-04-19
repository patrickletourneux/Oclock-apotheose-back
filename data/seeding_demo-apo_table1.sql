BEGIN;

INSERT INTO "user" (email, password, pseudonym) VALUES
('marie.curie@mail.fr', '$2b$10$xOcUe/8LLx7yoN7JtJuTKugavHU9qYXpa/iPGqlxTZpct4dNk2cvu', 'Marie'),
('pierre.curie@mail.fr', '$2b$10$DyxsP3Hlw.IwsfoarrWSneozl1K42jkp6rLhDOu3qJUk6SN2C0ndi', 'Pierre'),
('maëlle58@mail.com', '$2b$10$4DFjsfHNXWEANgDvGFRPDOiLoR1wsf4zP2QVDLu.a7WbpyCpwHcia', 'La Marquise'),
('tibault92@gmail.com', '$2b$10$QT9HGEJac/9mJg17CsdZ1.ubzOfpwkS8sq42xn5NpmkEy3R5Y6juG', 'Titi'),
('Sofia.Italia@mail.it', '$2b$10$thZDMe6u64TDqR7TFvEevehLl1KN6SJvfJnOaUm7gwDNPlm3LMoBS', 'La Ragazza'),
('Mat.Del@mail.com', '$2b$10$TklpvvonPa0H5X1E5D6DJ.loKtLROOFbzp6XAbWio/zu6Ewo6Au5K', 'Mat')
;

COMMIT;