const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();
const connection =require('../db');
const {accessTokenSecret} = require('../utils');

router.post('/addFavorite/', async (req, res) => {
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

router.delete('/deleteFavorite/', async (req, res) => {
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

router.get('/getFavorites/', async (req, res) => {
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