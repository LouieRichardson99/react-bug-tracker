CREATE TABLE bugs (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
  subject VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(25),
  due_date DATE,
  assignee INT,
  priority VARCHAR(25),
  project_id INT NOT NULL,
  FOREIGN KEY(assignee) REFERENCES users(id),
  FOREIGN KEY(project_id) REFERENCES projects(id)
);
