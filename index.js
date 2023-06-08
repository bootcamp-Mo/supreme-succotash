require('dotenv').config();

const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

// MySql connection
db.connect(function (error) {
	if (error) throw error;
	console.log('Connected to the database.');
	seeking();
});

const seeking = () => {
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'seeking',
				message: 'What would you like to look into?',
				choices: [
					'View All Employees',
					'View All Departments',
					'View All Roles',
					'Add Employee',
					'Add Department',
					'Add Role',
					'Update Employee Role',
					'Delete Employee',
					'Quit',
				],
			},
		])
		.then((answers) => {
			switch (answers.seeking) {
				case 'View All Employees':
					viewAllEmployees();
					break;
				case 'View All Departments':
					viewAllDepartments();
					break;
				case 'View All Roles':
					viewAllRoles();
					break;
				case 'Add Employee':
					addEmployee();
					break;
				case 'Add Department':
					addDepartment();
					break;
				case 'Add Role':
					addRole();
					break;
				case 'Update Employee Role':
					updateEmployee();
					break;
				case 'Delete Employee':
					deleteEmployee();
					break;
				case 'Quit':
					console.log('Quitting...');
					process.exit();
					break;
				default:
					console.log('Invalid option');
			}
		});
};

const viewAllEmployees = () => {
	const query =
		'SELECT * FROM employees JOIN roles ON employees.role_id = roles.id;';
	db.query(query, function (err, rows) {
		if (err) {
			console.log('An error occurred while retrieving employees', err);
		} else {
			console.table(rows);
		}
		seeking();
	});
};

const viewAllDepartments = () => {
	const query = 'SELECT * FROM departments;';
	db.query(query, function (err, rows) {
		if (err) {
			console.log('An error occurred while retrieving departments', err);
		} else {
			console.table(rows);
		}
		seeking();
	});
};

const viewAllRoles = () => {
	const query = 'SELECT * FROM roles;';
	db.query(query, function (err, rows) {
		if (err) {
			console.log('An error occurred while retrieving roles', err);
		} else {
			console.table(rows);
		}
		seeking();
	});
};

const addEmployee = () => {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'first_name',
				message: "What is the employee's first name?",
			},
			{
				type: 'input',
				name: 'last_name',
				message: "What is the employee's last name?",
			},
			{
				type: 'input',
				name: 'role_id',
				message: "What is the employee's role id?",
			},
			{
				type: 'input',
				name: 'manager_id',
				message: "What is the employee's manager id?",
			},
		])
		.then((answers) => {
			const query =
				'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
			const values = [
				answers.first_name,
				answers.last_name,
				answers.role_id,
				answers.manager_id,
			];
			db.query(query, values, function (err, result) {
				if (err) {
					console.log('An error occurred while adding employee', err);
				} else {
					console.log('New employee added successfully');
					console.log(result);
				}
				seeking();
			});
		});
};

const addDepartment = () => {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'name',
				message: 'What is the name of the department?',
			},
		])
		.then((answers) => {
			const query = 'INSERT INTO departments (name) VALUES (?)';
			const values = [answers.name];
			db.query(query, values, function (err, result) {
				if (err) {
					console.log('An error occurred while adding department', err);
				} else {
					console.log('New department added successfully');
					console.log(result);
				}
				seeking();
			});
		});
};

const addRole = () => {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'title',
				message: 'What is the title of the role?',
			},
			{
				type: 'input',
				name: 'salary',
				message: 'What is the salary of the role?',
			},
			{
				type: 'input',
				name: 'department_id',
				message: 'What is the department id of the role?',
			},
		])
		.then((answers) => {
			const query =
				'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
			const values = [
				answers.title,
				answers.salary,
				answers.department_id,
			];
			db.query(query, values, function (err, result) {
				if (err) {
					console.log('An error occurred while adding role', err);
				} else {
					console.log('New role added successfully');
					console.log(result);
				}
				seeking();
			});
		});
};

const updateEmployee = () => {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'employee_id',
				message: 'What is the employee id of the employee?',
			},
			{
				type: 'input',
				name: 'role_id',
				message: 'What is the role id of the employee?',
			},
		])
		.then((answers) => {
			const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
			const values = [answers.role_id, answers.employee_id];
			db.query(query, values, function (err, result) {
				if (err) {
					console.log('An error occurred while updating employee role', err);
				} else {
					console.log('Employee role updated successfully');
					console.log(result);
				}
				seeking();
			});
		});
};

const deleteEmployee = () => {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'employee_id',
				message: 'What is the employee id of the employee?',
			},
		])
		.then((answers) => {
			const query = 'DELETE FROM employees WHERE id = ?';
			const values = [answers.employee_id];
			db.query(query, values, function (err, result) {
				if (err) {
					console.log('An error occurred while deleting an employee', err);
				} else {
					console.log('Employee role deleted successfully');
					console.log(result);
				}
				seeking();
			});
		});
};

// Start the application
seeking();