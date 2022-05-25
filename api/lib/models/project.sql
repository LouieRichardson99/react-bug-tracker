CREATE TABLE projects (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
  name VARCHAR(255) NOT NULL,
  organisation_id INT NOT NULL,
  FOREIGN KEY(organisation_id) REFERENCES organisations(id)
);