INSERT INTO species (latin_name, name, description, is_animal, discoverable_winter) VALUES
('Froggyfrogus', 'Pilegiftfrø', 'A very poisonous frog found in the amazon river and Christiansø.', 1,1),
('Bibusbi', 'Honningbi', 'A very poisonous bi found in the amazon river and Christiansø.', 1,0)
;

INSERT INTO media (url, is_image, species) VALUES
('http://localhost:8080/media/Sapito.jpg', true, 'Froggyfrogus'),
('http://localhost:8080/media/Sapito.jpg', true, 'Bibusbi')
;

