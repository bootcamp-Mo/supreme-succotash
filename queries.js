const mysql = require('mysql2/promise')

class Database {
	constructor(config) {
		this.connection = mysql.createConnection(config)
	}
};
// Query methods 
async getAllDepartments(){
	const [rows] = await this.connection.execute('SELECT * FROM departments')
	return rows
}
async getAllRoles(){
	const [rows] = await this.connection.execute('SELECT * FROM roles')
	return rows
}; 
async getAllEmployees(){
	const [rows] = await this.connection.execute('SELECT * FROM employees')
	return rows
};
async addDepartment(name){
	const [results] = await this.connection.execute('INSERT INTO departments (name) VALUES (?)', [name])
	return results
};
async addRole(title, salary, department_id){
	const [results] = await this.connection.execute('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id])
	return results
};
async addEmployee(first_name, last_name, role_id, manager_id){
	const [results] = await this.connection.execute('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)')
	return results
};
async updateEmployeeRole(employee_id, role_id){
	const [results] = await this.connection.execute('UPDATE employees SET role_id = ? WHERE id = ?', [role_id, employee_id])
	return results
};
async deleteEmployee(){
	const [results] = await this.connection.execute('DELETE FROM employees WHERE id = ?', [employee_id])
	return results
};


module.exports = Database

// * query():
// This method is used to send an SQL query to the database server,
// it can also be used with parameterized queries and automatically
// escapes any data that is passed as a parameter.

// * execute():
// This method is used to execute prepared statements.
// It protects against SQL injection attacks by automatically escaping
// any data that is passed as a parameter.