/* eslint-disable no-undef */
const inquirer = require('inquirer')
const cTable = require('console.table')
const Database = require('./queries')


// MySql connection details
const dbConfig = {
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'employee_tracker'
}

const seeking = function () {
	inquirer
		.prompt([
			{
				type: 'list',
				name: 'seeking',
				message: 'What would you like to look into?',
				choices:
					[
						'View All Employees',
						'View All Department',
						'View All Roles',
						'Add Employee',
						'Add Department',
						'Add Role',
						'Update Employee Role',
						'Delete Employee',
						'Quit'
					]
			},
		])
		.then((seeking) => {
			console.log(seeking)
			switch (seeking.seeking) {
				case 'View All Employees':
					viewAllEmployees()
					break
				case 'View All Department':
					viewAllDepartments()
					break
				case 'View All Roles':
					viewAllRoles()
					break
				case 'Add Employee':
					addEmployee()
					break
				case 'Add Department':
					addDepartment()
					break
				case 'Add Role':
					addRole()
					break
				case 'Update Employee Role':
					updateEmployeeRole()
					break
				case 'Delete Employee':
					deleteEmployee()
					break
				case 'Quit':
					connection.end()
					break
				default:
					console.log('Invalid option');
			}
		}).catch(() => {

		});
}
seeking();