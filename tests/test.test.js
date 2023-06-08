//! Not working 

// /* eslint-disable no-undef */
// const inquirer = require('inquirer');
// const consoleTable = require('console.table');
// const mysql = require('mysql2');
// const queries = require('../index');

// const db = mysql.createConnection({
// 	host: process.env.DB_HOST,
// 	port: process.env.DB_PORT,
// 	user: process.env.DB_USER,
// 	password: process.env.DB_PASSWORD,
// 	database: process.env.DB_DATABASE,
// });

// jest.mock('inquirer');

// describe('Employee Tracker App', () => {
// 	beforeEach(() => {
// 		// Reset the mock to ensure a clean state for each test
// 		inquirer.prompt.mockReset();
// 	});

// 	describe('viewAllEmployees', () => {
// 		it('should display all employees', async () => {
// 			// Mock the prompt answers
// 			inquirer.prompt.mockResolvedValueOnce({
// 				seeking: 'View All Employees', // Provide the expected prompt answer
// 			});

// 			// Mock the database query result
// 			const mockedQueryResult = [
// 				{ id: 1, first_name: 'John', last_name: 'Doe', role_id: 1, manager_id: 1 },
// 				{ id: 2, first_name: 'Jane', last_name: 'Smith', role_id: 2, manager_id: 1 },
// 			];

// 			// Mock the database query function
// 			const mockDbQuery = jest.fn((query, callback) => {
// 				callback(null, mockedQueryResult);
// 			});

// 			// Mock the database connection object
// 			const db = { query: mockDbQuery };

// 			// Execute the function to test
// 			await queries.viewAllEmployees(db);

// 			// Verify that the database query function was called with the correct query
// 			expect(mockDbQuery).toHaveBeenCalledWith(
// 				'SELECT * FROM employees JOIN roles ON employees.role_id = roles.id;',
// 				expect.any(Function)
// 			);

// 			// Verify that the table was displayed with the correct data
// 			expect(console.table).toHaveBeenCalledWith(mockedQueryResult);
// 		});

// 		describe('viewAllDepartments', () => {
// 			it('should display all departments', async () => {
// 				const mockedQueryResult = [
// 					{ id: 1, name: 'Sales' },
// 					{ id: 2, name: 'Engineering' },
// 					{ id: 3, name: 'Marketing' },
// 				];
// 				// Mock the database query function
// 				const mockDbQuery = jest.fn((query, callback) => {
// 					callback(null, mockedQueryResult);
// 				});
// 				// Mock the database connection object
// 				const db = { query: mockDbQuery };
// 				// Execute the function to test
// 				await viewAllDepartments(db);
// 				// Verify that the database query function was called with the correct query
// 				expect(mockDbQuery).toHaveBeenCalledWith(
// 					'SELECT * FROM departments;',
// 					expect.any(Function)
// 				);
// 				// Verify that the table was displayed with the correct data
// 				expect(console.table).toHaveBeenCalledWith(mockedQueryResult);
// 			});
// 			it('should handle errors during database query', async () => {
// 				// Mock the database query function to throw an error
// 				const mockDbQuery = jest.fn((query, callback) => {
// 					callback(new Error('Database error'));
// 				});
// 				// Mock the database connection object
// 				const db = { query: mockDbQuery };
// 				// Execute the function to test
// 				await viewAllDepartments(db);
// 				// Verify that the error message was logged
// 				expect(console.log).toHaveBeenCalledWith('An error occurred while retrieving departments', expect.any(Error));
// 			});
// 		});

// 		describe('viewAllRoles', () => {
// 			it('should display all roles', async () => {
// 				const mockedQueryResult = [
// 					{ id: 1, title: 'Sales Manager', salary: 50000, department_id: 1 },
// 					{ id: 2, title: 'Sales Representative', salary: 30000, department_id: 1 },
// 					{ id: 3, title: 'Engineer', salary: 20000, department_id: 2 },
// 					{ id: 4, title: 'Marketing Manager', salary: 70000, department_id: 3 },
// 				];
// 				// Mock the database query function
// 				const mockDbQuery = jest.fn((query, callback) => {
// 					callback(null, mockedQueryResult);
// 				});
// 				// Mock the database connection object	
// 				const db = { query: mockDbQuery };
// 				// Execute the function to test
// 				await viewAllRoles(db);
// 				// Verify that the database query function was called with the correct query
// 				expect(mockDbQuery).toHaveBeenCalledWith(
// 					'SELECT * FROM roles;',
// 					expect.any(Function)
// 				);
// 				// Verify that the table was displayed with the correct data
// 				expect(console.table).toHaveBeenCalledWith(mockedQueryResult);
// 			});
// 			it('should handle errors during database query', async () => {
// 				// Mock the database query function to throw an error
// 				const mockDbQuery = jest.fn((query, callback) => {
// 					callback(new Error('Database error'));
// 				});
// 				// Mock the database connection object
// 				const db = { query: mockDbQuery };
// 				// Execute the function to test
// 				await viewAllRoles(db);
// 				// Verify that the error message was logged
// 				expect(console.log).toHaveBeenCalledWith('An error occurred while retrieving roles', expect.any(Error));
// 			});
// 		});

// 		describe('addEmployee', () => {
// 			it('should add a new employee', async () => {
// 				const mockedQueryResult = { id: 1, first_name: 'John', last_name: 'Doe', role_id: 1, manager_id: 1 };
// 				// Mock the database query function
// 				const mockDbQuery = jest.fn((query, values, callback) => {
// 					callback(null, mockedQueryResult);
// 				});

// 				// Mock the inquirer prompt to return mock answers
// 				mockedInquirer.prompt.mockResolvedValueOnce({
// 					first_name: 'John',
// 					last_name: 'Doe',
// 					role_id: 1,
// 					manager_id: 1,
// 				});

// 				// Mock the database connection object
// 				const db = { query: mockDbQuery };

// 				// Execute the function to test
// 				await addEmployee(db);

// 				// Verify that the database query function was called with the correct query and values
// 				expect(mockDbQuery).toHaveBeenCalledTimes(1);
// 				expect(mockDbQuery).toHaveBeenCalledWith(
// 					'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
// 					['John', 'Doe', 1, 1]
// 				);

// 				// Verify that the log messages indicate successful addition
// 				expect(console.log).toHaveBeenCalledWith('New employee added successfully');
// 				expect(console.log).toHaveBeenCalledWith(mockedQueryResult);
// 			});

// 			it('should handle errors during database query', async () => {
// 				// Mock the database query function to throw an error
// 				const mockDbQuery = jest.fn((query, values, callback) => {
// 					callback(new Error('Database error'));
// 				});

// 				// Mock the inquirer prompt to return mock answers
// 				mockedInquirer.prompt.mockResolvedValueOnce({
// 					first_name: 'John',
// 					last_name: 'Doe',
// 					role_id: 1,
// 					manager_id: 1,
// 				});

// 				// Mock the database connection object
// 				const db = { query: mockDbQuery };

// 				// Execute the function to test
// 				await addEmployee(db);

// 				// Verify that the error message was logged
// 				expect(console.log).toHaveBeenCalledWith(
// 					'An error occurred while adding employee',
// 					expect.any(Error)
// 				);
// 			});

// 			it('should handle empty or invalid input values', async () => {
// 				// Mock the inquirer prompt to return mock answers
// 				mockedInquirer.prompt.mockResolvedValueOnce({
// 					first_name: '', // Empty first_name
// 					last_name: 'Doe',
// 					role_id: 'Invalid', // Invalid role_id
// 					manager_id: 'abc', // Invalid manager_id
// 				});

// 				// Execute the function to test
// 				await addEmployee();

// 				// Verify that the database query function was not called
// 				expect(mockDbQuery).not.toHaveBeenCalled();

// 				// Verify that the error messages were logged
// 				expect(console.log).toHaveBeenCalledWith('Invalid input. Please provide valid values.');
// 			});
// 		});


// 		describe('addRole', () => {
// 			it('should add a new role', async () => {
// 				const mockedQueryResult = { id: 1, title: 'Sales Manager', salary: 50000, department_id: 1 };
// 				// Mock the database query function
// 				const mockDbQuery = jest.fn((query, callback) => {
// 					callback(null, mockedQueryResult);
// 				})

// 				// Mock the inquirer prompt to return mock answers
// 				mockedInquirer.prompt.mockResolvedValueOnce({
// 					title: 'Sales Manager',
// 					salary: 50000,
// 					department_id: 1,
// 				});
// 				// Mock the database connection object
// 				const db = { query: mockDbQuery };
// 				// Execute the function to test
// 				await addRole(db);
// 				// Verify that the database query function was called with the correct query
// 				expect(mockDbQuery).toHaveBeenCalledTimes(1);
// 				expect(mockDbQuery).toHaveBeenCalledWith(
// 					'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
// 					['Sales Manager', 50000, 1]
// 				);

// 				// Verify that the log messages indicate successful addition
// 				expect(console.log).toHaveBeenCalledWith('New role added successfully');
// 				expect(console.log).toHaveBeenCalledWith(mockedQueryResult);
// 			})
// 			it('should handle errors during database query', async () => {
// 				// Mock the database query function to throw an error
// 				const mockDbQuery = jest.fn((query, callback) => {
// 					callback(new Error('Database error'));
// 				})
// 				// Mock the inquirer prompt to return mock answers
// 				mockedInquirer.prompt.mockResolvedValueOnce({
// 					title: 'Sales Manager',
// 					salary: 50000,
// 					department_id: 1,
// 				});
// 				// Mock the database connection object
// 				const db = { query: mockDbQuery };
// 				// Execute the function to test
// 				await addRole(db);
// 				// Verify that the error message was logged
// 				expect(console.log).toHaveBeenCalledWith('An error occurred while adding role', expect.any(Error));
// 			})
// 			it('should handle empty or invalid input values', async () => {
// 				// Mock the inquirer prompt to return mock answers
// 				mockedInquirer.prompt.mockResolvedValueOnce({
// 					title: '', // Empty title
// 					salary: 'Invalid', // Invalid salary
// 					department_id: 'abc', // Invalid department_id
// 				});

// 				// Execute the function to test
// 				await addRole();

// 				// Verify that the database query function was not called
// 				expect(mockDbQuery).not.toHaveBeenCalled();

// 				// Verify that the error messages were logged
// 				expect(console.log).toHaveBeenCalledWith('Invalid input. Please provide valid values.');
// 			});
// 		})

// 		describe('addDepartment', () => {
// 			it('should add a new department', async () => {
// 				const mockedQueryResult = { id: 1, name: 'Sales' };
// 				// Mock the database query function
// 				const mockDbQuery = jest.fn((query, values, callback) => {
// 					callback(null, mockedQueryResult);
// 				});

// 				// Mock the inquirer prompt to return mock answers
// 				mockedInquirer.prompt.mockResolvedValueOnce({
// 					name: 'Sales',
// 				});

// 				// Mock the database connection object
// 				const db = { query: mockDbQuery };

// 				// Execute the function to test
// 				await addDepartment(db);

// 				// Verify that the database query function was called with the correct query and values
// 				expect(mockDbQuery).toHaveBeenCalledTimes(1);
// 				expect(mockDbQuery).toHaveBeenCalledWith(
// 					'INSERT INTO departments (name) VALUES (?)',
// 					['Sales']
// 				);

// 				// Verify that the log messages indicate successful addition
// 				expect(console.log).toHaveBeenCalledWith('New department added successfully');
// 				expect(console.log).toHaveBeenCalledWith(mockedQueryResult);
// 			});

// 			it('should handle errors during database query', async () => {
// 				// Mock the database query function to throw an error
// 				const mockDbQuery = jest.fn((query, values, callback) => {
// 					callback(new Error('Database error'));
// 				});

// 				// Mock the inquirer prompt to return mock answers
// 				mockedInquirer.prompt.mockResolvedValueOnce({
// 					name: 'Sales',
// 				});

// 				// Mock the database connection object
// 				const db = { query: mockDbQuery };

// 				// Execute the function to test
// 				await addDepartment(db);

// 				// Verify that the error message was logged
// 				expect(console.log).toHaveBeenCalledWith(
// 					'An error occurred while adding department',
// 					expect.any(Error)
// 				);
// 			});

// 			it('should handle empty or invalid input values', async () => {
// 				// Mock the inquirer prompt to return mock answers
// 				mockedInquirer.prompt.mockResolvedValueOnce({
// 					name: '', // Empty name
// 				});

// 				// Execute the function to test
// 				await addDepartment();

// 				// Verify that the database query function was not called
// 				expect(mockDbQuery).not.toHaveBeenCalled();

// 				// Verify that the error messages were logged
// 				expect(console.log).toHaveBeenCalledWith('Invalid input. Please provide a valid name.');
// 			});
// 		});

// 		describe('updateEmployee', () => {
// 			it('should update employee role', async () => {
// 				const mockedQueryResult = { id: 1, name: 'Sales' };
// 				// Mock the database query function
// 				const mockDbQuery = jest.fn((query, values, callback) => {
// 					callback(null, mockedQueryResult);
// 				});

// 				// Mock the inquirer prompt to return mock answers
// 				mockedInquirer.prompt.mockResolvedValueOnce({
// 					employee_id: 1,
// 					role_id: 2,
// 				});

// 				// Mock the database connection object
// 				const db = { query: mockDbQuery };

// 				// Execute the function to test
// 				await updateEmployee(db);

// 				// Verify that the database query function was called with the correct query and values
// 				expect(mockDbQuery).toHaveBeenCalledTimes(1);
// 				expect(mockDbQuery).toHaveBeenCalledWith(
// 					'UPDATE employees SET role_id = ? WHERE id = ?',
// 					[2, 1]
// 				);

// 				// Verify that the log messages indicate successful update
// 				expect(console.log).toHaveBeenCalledWith('Employee role updated successfully');
// 				expect(console.log).toHaveBeenCalledWith(mockedQueryResult);
// 			});

// 			it('should handle errors during database query', async () => {
// 				// Mock the database query function to throw an error
// 				const mockDbQuery = jest.fn((query, values, callback) => {
// 					callback(new Error('Database error'));
// 				});

// 				// Mock the inquirer prompt to return mock answers
// 				mockedInquirer.prompt.mockResolvedValueOnce({
// 					employee_id: 1,
// 					role_id: 2,
// 				});

// 				// Mock the database connection object
// 				const db = { query: mockDbQuery };

// 				// Execute the function to test
// 				await updateEmployee(db);

// 				// Verify that the error message was logged
// 				expect(console.log).toHaveBeenCalledWith(
// 					'An error occurred while updating employee role',
// 					expect.any(Error)
// 				);
// 			});

// 			it('should handle empty or invalid input values', async () => {
// 				// Mock the inquirer prompt to return mock answers
// 				mockedInquirer.prompt.mockResolvedValueOnce({
// 					employee_id: '', // Empty employee_id
// 					role_id: 2,
// 				});

// 				// Execute the function to test
// 				await updateEmployee();

// 				// Verify that the database query function was not called
// 				expect(mockDbQuery).not.toHaveBeenCalled();

// 				// Verify that the error messages were logged
// 				expect(console.log).toHaveBeenCalledWith('Invalid input. Please provide a valid employee ID.');
// 			});
// 		});

// 		describe('deleteEmployee', () => {
// 			it('should delete an employee', async () => {
// 				const mockedQueryResult = { id: 1, name: 'Sales' };
// 				// Mock the database query function
// 				const mockDbQuery = jest.fn((query, values, callback) => {
// 					callback(null, mockedQueryResult);
// 				});

// 				// Mock the inquirer prompt to return mock answers
// 				mockedInquirer.prompt.mockResolvedValueOnce({
// 					employee_id: 1,
// 				});

// 				// Mock the database connection object
// 				const db = { query: mockDbQuery };

// 				// Execute the function to test
// 				await deleteEmployee(db);

// 				// Verify that the database query function was called with the correct query and values
// 				expect(mockDbQuery).toHaveBeenCalledTimes(1);
// 				expect(mockDbQuery).toHaveBeenCalledWith('DELETE FROM employees WHERE id = ?', [1]);

// 				// Verify that the log messages indicate successful deletion
// 				expect(console.log).toHaveBeenCalledWith('Employee deleted successfully');
// 				expect(console.log).toHaveBeenCalledWith(mockedQueryResult);
// 			});

// 			it('should handle errors during database query', async () => {
// 				// Mock the database query function to throw an error
// 				const mockDbQuery = jest.fn((query, values, callback) => {
// 					callback(new Error('Database error'));
// 				});

// 				// Mock the inquirer prompt to return mock answers
// 				mockedInquirer.prompt.mockResolvedValueOnce({
// 					employee_id: 1,
// 				});

// 				// Mock the database connection object
// 				const db = { query: mockDbQuery };

// 				// Execute the function to test
// 				await deleteEmployee(db);

// 				// Verify that the error message was logged
// 				expect(console.log).toHaveBeenCalledWith(
// 					'An error occurred while deleting an employee',
// 					expect.any(Error)
// 				);
// 			});

// 			it('should handle empty or invalid input values', async () => {
// 				// Mock the inquirer prompt to return mock answers
// 				mockedInquirer.prompt.mockResolvedValueOnce({
// 					employee_id: '', // Empty employee_id
// 				});

// 				// Execute the function to test
// 				await deleteEmployee();

// 				// Verify that the database query function was not called
// 				expect(mockDbQuery).not.toHaveBeenCalled();

// 				// Verify that the error messages were logged
// 				expect(console.log).toHaveBeenCalledWith('Invalid input. Please provide a valid employee ID.');
// 			});
// 		});
// 		const closeDbConnection = () => {
// 			return new Promise((resolve) => {
// 				db.end(() => {
// 					resolve();
// 				});
// 			});
// 		};

// 		afterEach(async () => {
// 			await closeDbConnection();
// 		});
// 	})
// });