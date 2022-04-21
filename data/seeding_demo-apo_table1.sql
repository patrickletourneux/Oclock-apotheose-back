BEGIN;

INSERT INTO "user" (email, password, pseudonym) VALUES
('marie.curie@mail.fr', '$2b$10$7ELaDaxw4kWdEJiQLfOEIu516S6BXfYr.sQCzlKnpXnGRAlOazgmi', 'Marie'),
('pierre.curie@mail.fr', '$2b$10$7eNRj.5qZVIlzSros/LVcOlUYeO1zab44oymksL5vOl8hoPhuHfNC', 'Pierre'),
('maëlle58@mail.com', '$2b$10$E6VAYGoS50wjTxPuhPopKuWTzTeQoovfwLN3KEcNXBsI3KHwVz0T.', 'La Marquise'),
('tibault92@gmail.com', '$2b$10$YEnkZSxIhs0YveN/qKNX.uGko4vWiyLDNekZyexIq0oQC7/tilT5y', 'Titi'),
('Sofia.Italia@mail.it', '$2b$10$gs9KHcmOVKbbZwQk6jtSh.9/3LClZC47UJYeClXPvVKJ6Kuq.xb0W', 'La Ragazza'),
('Mat.Del@mail.com', '$2b$10$V2ELRbOKQ8zoGcME9.dOH.to8nOOLrNjktQ9Q1xrJ9uzSQSfbApkC', 'Mat')
;

COMMIT;