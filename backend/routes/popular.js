const express = require('express');
const router = express.Router();
const connection =require('../db');

/**
 * Method: Get
 * Handle get popular categories
 */
router.get('/categories', async (req, res) => {
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
router.get('/products', async (req, res) => {
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