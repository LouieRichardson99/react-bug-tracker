CREATE TABLE organisation_users (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
  user_id INT NOT NULL,
  organisation_id INT NOT NULL,
  is_admin TINYINT NOT NULL DEFAULT 0,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(organisation_id) REFERENCES organisations(id)
);