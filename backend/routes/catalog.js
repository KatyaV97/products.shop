const express = require('express');
const router = express.Router();
const connection =require('../db');

router.get('/getCategories', async (req, res) => {
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

router.get('/getProducts', async (req, res) => {
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

router.get('/getProduct/', async (req, res) => {
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

router.get('/getSearchProducts/', async (req, res) => {
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