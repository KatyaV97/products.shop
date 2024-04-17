const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const {accessTokenSecret} = require('../utils');
const connection =require('../db');

router.post('/task', async (req, res) => {
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

router.get('/getProducts/', async (req, res) => {
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

router.post('/addProduct/', async (req, res) => {
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

router.delete('/deleteProduct/', async (req, res) => {
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