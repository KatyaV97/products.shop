const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'shop',
});
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const refreshTokenSecret = 'yourrefreshtokensecret';

app.use(express.json());

const path = require('path');

const port = process.env.PORT || 8999;

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:8999', 'http://localhost:5000']
}

app.use(cors(corsOptions));
app.use('/public', express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);


function generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {expiresIn: '1h'});
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {expiresIn: '24h'});

    return {accessToken, refreshToken};
}

/**
 * Method: POST
 * Handle user login or registration
 */
app.post('/api/auth/login/', async (req, res) => {
    const params = req.body;
    console.log(req.body)
    try {
        const response = await fetchFromDatabase(params);
        if (response) {
            const user = {id: response.id, name: response.name};
            const tokens = generateTokens(user);

            await saveRefreshToken(user.id, tokens.refreshToken);

            res.json({
                ...response,
                ...tokens
            });
        }
    } catch (exception) {
        res.status(500).json({
            error: true,
            code: exception.code,
            message: exception.message
        });
    }
});

async function saveRefreshToken(userId, refreshToken) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO user_tokens (user_id, refresh_token) VALUES (?, ?)', [userId, refreshToken], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve({message: 'Refresh token saved successfully'});
            }
        });
    });
}

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

/**
 * Method: POST
 * Handle user registration
 */
app.post('/api/auth/register', async (req, res) => {
    const params = req.body;

    try {
        // Perform necessary operations here, like adding data to the database
        const response = await createAccount(params);
        console.log(response)
        const user = {id: response.userId, name: params.name};
        const tokens = generateTokens(user);

        await saveRefreshToken(user.id, tokens.refreshToken);

        res.json({
            ...response,
            ...tokens
        });
    } catch (exception) {
        res.status(500).json({
            error: true,
            code: exception.code,
            message: exception.message
        });
    }
});

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


/**
 * Method: POST
 * Handle token refresh
 */
app.post('/api/auth/refresh-token', async (req, res) => {
    const {token} = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({name: user.name, role: user.role}, accessTokenSecret, {expiresIn: '20m'});

        res.json({
            accessToken
        });
    });
});



const start = () => {
    try {
        server.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (e) {
        console.log(e);
    }
}

start();