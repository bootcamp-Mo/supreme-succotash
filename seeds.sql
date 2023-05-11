-- Departments
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Human Resources');
INSERT INTO department (name) VALUES ('Finance');
INSERT INTO department (name) VALUES ('Sales');

-- Roles
INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 90000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Project Manager', 95000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('HR Specialist', 60000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('HR Manager', 85000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Accountant', 70000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Financial Analyst', 80000, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Sales Representative', 65000, 4);
INSERT INTO role (title, salary, department_id) VALUES ('Sales Manager', 90000, 4);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Michael', 'Brown', 3, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Emily', 'Johnson', 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('William', 'Davis', 5, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Elizabeth', 'Garcia', 6, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('David', 'Miller', 7, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Samantha', 'Martinez', 8, 7);
