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

    try {
        const response = await fetchFromDatabase(params);
        if (response) {
            const user = {id: response.id, name: response.name};
            const tokens = generateTokens(user);

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

/**
 * Method: Get
 * Handle get popular categories
 */
app.get('/api/popular/categories', async (req, res) => {
    try {
        const response = await fetchPopularCategories();
        res.json(response);
    } catch (exception) {
        res.status(500).json({
            error: true,
            code: exception.code,
            message: exception.message
        });
    }
});

/**
 * Method: Get
 * Handle get popular products
 */
app.get('/api/popular/products', async (req, res) => {
    try {
        const response = await fetchPopularProducts();

        res.json(response);
    } catch (exception) {
        res.status(500).json({
            error: true,
            code: exception.code,
            message: exception.message
        });
    }
});

async function fetchPopularCategories() {
    return new Promise((resolve, reject) => {
        // Query the database
        connection.query('SELECT * FROM popular_categories', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function fetchPopularProducts() {
    return new Promise((resolve, reject) => {
        // Query the database
        connection.query('SELECT * FROM popular_products', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

app.get('/api/catalog/getCategories', async (req, res) => {
    try {
        const response = await fetchCategories();
        res.json(response);
    } catch (exception) {
        res.status(500).json({
            error: true,
            code: exception.code,
            message: exception.message
        });
    }
});

async function fetchCategories() {
    return new Promise((resolve, reject) => {
        // Query the database
        connection.query('SELECT * FROM categories', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

app.get('/api/catalog/getProducts', async (req, res) => {
    const categoryId = req.query.category_id;
    try {
        const response = await fetchProductsByCategory(categoryId);
        res.json(response);
    } catch (exception) {
        res.status(500).json({
            error: true,
            code: exception.code,
            message: exception.message
        });
    }
});

async function fetchProductsByCategory(categoryId) {
    return new Promise((resolve, reject) => {
        // Query the database
        connection.query('SELECT * FROM products WHERE category_id = ?', [categoryId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

app.get('/api/catalog/getProduct/', async (req, res) => {
    const productId = req.query.product_id;

    try {
        const response = await fetchProductById(productId);
        res.json(response);
    } catch (exception) {
        res.status(500).json({
            error: true,
            code: exception.code,
            message: exception.message
        });
    }
});

async function fetchProductById(productId) {
    return new Promise((resolve, reject) => {
        // Query the database
        connection.query('SELECT * FROM products WHERE id = ?', [productId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

app.post('/api/basket/task', async (req, res) => {
    const {products, name, phoneNumber, email, date} = req.body
    try {
        const response = await createTask(JSON.parse(products), name, phoneNumber, email, date);
        res.json(response);
    } catch (exception) {
        res.status(500).json({
            error: true,
            code: exception.code,
            message: exception.message
        });
    }
});

async function createTask(products, name, phoneNumber, email, date) {
    const queries = Object.entries(products).map(([productId, count]) => {
        return new Promise((resolve, reject) => {
            // Query the database
            connection.query('INSERT INTO orders (product_id, count, name, phone_number, email, order_date) VALUES (?, ?, ?, ?, ?, ?)', [productId, count, name, phoneNumber, email, date], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({message: 'Task created successfully'});
                }
            });
        });
    });
    return Promise.all(queries);
}

app.get('/api/basket/getProducts/', async (req, res) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer <token>
        // Now you can use the token

        jwt.verify(token, accessTokenSecret, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            try {
                const response = await fetchProductsByIds(user.id);
                res.json(response);
            } catch (exception) {
                res.status(500).json({
                    error: true,
                    code: exception.code,
                    message: exception.message
                });
            }
        });
    } else {
        res.sendStatus(401);
    }
});

async function fetchProductsByIds(userId) {
    return new Promise((resolve, reject) => {
        // Query the database
        connection.query( 'SELECT p.*, bp.quantity FROM basket_products bp JOIN products p ON bp.product_id = p.id WHERE bp.user_id = ?', [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

app.post('/api/basket/addProduct/', async (req, res) => {
    const {product_id, count} = req.body;
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer <token>
        // Now you can use the token

        jwt.verify(token, accessTokenSecret, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            try {
                const response = await addProductToBasket(user.id, product_id, count);
                res.json(response);
            } catch (exception) {
                res.status(500).json({
                    error: true,
                    code: exception.code,
                    message: exception.message
                });
            }
        });
    } else {
        res.sendStatus(401);
    }
});

async function addProductToBasket(userId, productId, count) {
    return new Promise((resolve, reject) => {
        // Query the database
        connection.query('INSERT INTO basket_products (user_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?',
            [userId, productId, count, count], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve({message: 'Product added to basket successfully'});
            }
        });
    });
}

app.delete('/api/basket/deleteProduct/', async (req, res) => {
    const {product_id} = req.body

    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer <token>
        // Now you can use the token

        jwt.verify(token, accessTokenSecret, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            try {
                const response = await removeProductFromBasket(user.id, product_id);
                res.json(response);
            } catch (exception) {
                res.status(500).json({
                    error: true,
                    code: exception.code,
                    message: exception.message
                });
            }
        });
    } else {
        res.sendStatus(401);
    }
});

async function removeProductFromBasket(userId, productId) {
    return new Promise((resolve, reject) => {
        // Query the database
        connection.query('DELETE FROM basket_products WHERE user_id = ? AND product_id = ?', [userId, productId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve({message: 'Product removed from basket successfully'});
            }
        });
    });

}

app.get('/api/catalog/getSearchProducts/', async (req, res) => {
    const prompt = req.query.prompt;
    try {
        const response = await fetchProductsByPrompt(prompt);
        res.json(response);
    } catch (exception) {
        res.status(500).json({
            error: true,
            code: exception.code,
            message: exception.message
        });
    }
});

app.get('/api/favorites/getFavorites/', async (req, res) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer <token>
        // Now you can use the token

        jwt.verify(token, accessTokenSecret, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            try {
                const response = await fetchFavoritesProductsByIds(user.id);
                res.json(response);
            } catch (exception) {
                res.status(500).json({
                    error: true,
                    code: exception.code,
                    message: exception.message
                });
            }
        });
    } else {
        res.sendStatus(401);
    }
});

async function fetchFavoritesProductsByIds(userId){
    return new Promise((resolve, reject) => {
        // Query the database
        connection.query( 'SELECT p.* FROM favorite_products bp JOIN products p ON bp.product_id = p.id WHERE bp.user_id = ?', [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

app.post('/api/favorites/addFavorite/', async (req, res) => {
    const {product_id} = req.body;
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer <token>
        // Now you can use the token

        jwt.verify(token, accessTokenSecret, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            try {
                const response = await addFavoriteProductToDB(user.id, product_id);
                res.json(response);
            } catch (exception) {
                res.status(500).json({
                    error: true,
                    code: exception.code,
                    message: exception.message
                });
            }
        });
    } else {
        res.sendStatus(401);
    }
});

async function addFavoriteProductToDB(userId, productId) {
    return new Promise((resolve, reject) => {
        // Query the database
        connection.query('INSERT INTO favorite_products (user_id, product_id) VALUES (?, ?)',
            [userId, productId], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({message: 'Product added to DB successfully'});
                }
            });
    });
}

app.delete('/api/favorites/deleteFavorite/', async (req, res) => {
    const {product_id} = req.body;

    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer <token>
        // Now you can use the token

        jwt.verify(token, accessTokenSecret, async (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            try {
                const response = await removeFavoriteProductFromDB(user.id, product_id);
                res.json(response);
            } catch (exception) {
                res.status(500).json({
                    error: true,
                    code: exception.code,
                    message: exception.message
                });
            }
        });
    } else {
        res.sendStatus(401);
    }
});

async function removeFavoriteProductFromDB(userId, productId) {
    return new Promise((resolve, reject) => {
        // Query the database
        connection.query('DELETE FROM favorite_products WHERE user_id = ? AND product_id = ?', [userId, productId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve({message: 'Product removed from DB successfully'});
            }
        });
    });
}

async function fetchProductsByPrompt(prompt) {
    return new Promise((resolve, reject) => {
        const values = [`%${prompt}%`, `%${prompt}%`];
        // Query the database
        connection.query('SELECT * FROM products WHERE title LIKE ? OR description LIKE ?', values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

app.get('/api/orders/getOrders/', async (req, res) => {
    try {
        const response = await fetchOrdersGroupedByPhoneNumber();
        res.json(response);
    } catch (exception) {
        res.status(500).json({
            error: true,
            code: exception.code,
            message: exception.message
        });
    }
});

async function fetchOrdersGroupedByPhoneNumber() {
    return new Promise((resolve, reject) => {
        // Query the database
        connection.query('SELECT t.*, p.* FROM orders t JOIN products p ON t.product_id = p.id ORDER BY t.phone_number', (error, results) => {
            if (error) {
                reject(error);
            } else {
                // Group tasks by phone number

                const tasksGroupedByPhoneNumber = results.reduce((groups, task) => {
                    const key = task.phone_number
                    let index = groups.findIndex( user => user.phone_number === key);
                    if (index === -1) {
                        groups.push({
                            id: task.id,
                            phone_number: task.phone_number,
                            user_name: task.name,
                            date: task.order_date,
                            products: []
                        })
                        index = groups.length - 1
                    }
                    groups[index].products.push({
                        count: task.count,
                        product_name: task.title,
                        product_price: task.price
                    });
                    return groups;
                }, []);

                resolve(tasksGroupedByPhoneNumber);
            }
        });
    });
}

app.delete('/api/orders/deleteOrder/', async (req, res) => {
    const {phone_number} = req.body;

    try {
        const response = await deleteOrdersByPhoneNumber(phone_number);
        res.json(response);
    } catch (exception) {
        res.status(500).json({
            error: true,
            code: exception.code,
            message: exception.message
        });
    }
});

async function deleteOrdersByPhoneNumber(phoneNumber) {
    return new Promise((resolve, reject) => {
        // Query the database
        connection.query('DELETE FROM orders WHERE phone_number = ?', [phoneNumber], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve({message: 'Orders removed successfully'});
            }
        });
    });
}

const start = () => {
    try {
        server.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (e) {
        console.log(e);
    }
}

start();