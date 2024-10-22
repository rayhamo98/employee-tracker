"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewCombinedSalaries = exports.deleteEmployee = exports.viewEmployeesByDepartment = exports.viewAllEmployeesByManager = exports.updateEmployeeManager = exports.updateEmployeeRole = exports.addEmployee = exports.viewAllEmployees = exports.deleteRole = exports.addRole = exports.viewAllRoles = exports.deleteDepartment = exports.addDepartment = exports.viewAllDepartments = void 0;
// queries.ts
const connection_1 = require("./connection");
// Department Queries
const viewAllDepartments = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection_1.pool.query('SELECT * FROM department');
    return result.rows;
});
exports.viewAllDepartments = viewAllDepartments;
const addDepartment = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection_1.pool.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
    return result.rows[0];
});
exports.addDepartment = addDepartment;
const deleteDepartment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection_1.pool.query('DELETE FROM department WHERE id = $1;', [id]);
});
exports.deleteDepartment = deleteDepartment;
// Role Queries
const viewAllRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection_1.pool.query(`
        SELECT 
            role.id AS "Role ID", 
            role.title AS "Title", 
            role.salary AS "Salary", 
            department.name AS "Department"
        FROM 
            role
        JOIN 
            department ON role.department_id = department.id;
        `);
    return result.rows;
});
exports.viewAllRoles = viewAllRoles;
const addRole = (title, salary, department_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection_1.pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, department_id]);
    return result.rows[0];
});
exports.addRole = addRole;
const deleteRole = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.pool.query('DELETE FROM role WHERE id = $1', [id]);
});
exports.deleteRole = deleteRole;
// Employee Queries
const viewAllEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection_1.pool.query(`
        SELECT 
            employee.id AS "Employee ID",
            employee.first_name AS "First Name",
            employee.last_name AS "Last Name",
            role.title AS "Title",
            role.salary AS "Salary",
            department.name AS "Department",
            CONCAT(manager.first_name, ' ', manager.last_name) AS "Manager"
        FROM
            employee
        JOIN 
            role ON employee.role_id = role.id
        JOIN
            department ON role.department_id = department.id
        LEFT JOIN
            employee manager ON employee.manager_id = manager.id;
`);
    return result.rows;
});
exports.viewAllEmployees = viewAllEmployees;
const addEmployee = (first_name, last_name, role_id, manager_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection_1.pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [first_name, last_name, role_id, manager_id]);
    return result.rows[0];
});
exports.addEmployee = addEmployee;
const updateEmployeeRole = (id, role_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection_1.pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, id]);
    return result.rows[0];
});
exports.updateEmployeeRole = updateEmployeeRole;
const updateEmployeeManager = (id, manager_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection_1.pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [manager_id, id]);
    return result.rows[0];
});
exports.updateEmployeeManager = updateEmployeeManager;
const viewAllEmployeesByManager = (manager_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection_1.pool.query(`SELECT employee.id, employee.first_name, employee.last_name FROM employee WHERE manager_id = $1`, [manager_id]);
    return result.rows;
});
exports.viewAllEmployeesByManager = viewAllEmployeesByManager;
const viewEmployeesByDepartment = (department_name) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection_1.pool.query(`
        SELECT 
            employee.id AS "Employee ID",
            employee.first_name AS "First Name",
            employee.last_name AS "Last Name",
            role.title AS "Title",
            role.salary AS "Salary",
            department.name AS "Department",
            CONCAT(manager.first_name, ' ', manager.last_name) AS "Manager"
        FROM
            employee
        JOIN 
            role ON employee.role_id = role.id
        JOIN
            department ON role.department_id = department.id
        LEFT JOIN
            employee manager ON employee.manager_id = manager.id
        WHERE
            department.name = $1;
        `, [department_name]);
    return result.rows;
});
exports.viewEmployeesByDepartment = viewEmployeesByDepartment;
const deleteEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.pool.query('DELETE FROM employee WHERE id = $1', [id]);
});
exports.deleteEmployee = deleteEmployee;
// Salary Queries
const viewCombinedSalaries = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection_1.pool.query('SELECT SUM(role.salary) AS "Total Combined Salaries" FROM employee JOIN role ON employee.role_id = role.id');
    return result.rows[0];
});
exports.viewCombinedSalaries = viewCombinedSalaries;
