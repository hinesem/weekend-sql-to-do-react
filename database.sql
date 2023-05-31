CREATE TABLE tasks (
  "id" serial primary key,
  "task" varchar(50) not null,
  "status" bool,
  "description" varchar(100) not null
  );

INSERT INTO tasks (task, status, description)
VALUES ('fix lawn mower', 'completed', 'schedule appointment with CSE Repair'),
('oil change', 'incomplete', 'schedule oil change');