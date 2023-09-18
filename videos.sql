CREATE TABLE videos (
	id serial PRIMARY KEY,
	title VARCHAR ( 200 ) NOT NULL,
	url VARCHAR ( 200 ) NOT NULL,
	rating INT NOT NULL	
);

-- id INT NOT NULL  this is another approach