const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'shop',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
});

async function fetchFromDatabase(params) {
    const {email, password} = params;
    return new Promise((resolve, reject) => {
        // Query the database
        connection.query(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (error, results) => {
            if (error) {
                reject(error);
            } else {
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    reject(new Error('User not found'));
                }
            }
        });
    });
}

async function createAccount(params) {
    const {name, email, password} = params;
    return new Promise((resolve, reject) => {
        // Query the database
        connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve({message: 'User created successfully', userId: results.insertId});
            }
        });
    });
}

module.exports = { fetchFromDatabase, createAccount, connection };