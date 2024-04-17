const express = require('express');
const router = express.Router();
const {generateTokens, accessTokenSecret} = require('../utils');
const {fetchFromDatabase, createAccount} = require('../db');
const jwt = require("jsonwebtoken");

/**
 * Method: POST
 * Handle user login or registration
 */
router.post('/login/', async (req, res) => {
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

/**
 * Method: POST
 * Handle user registration
 */
router.post('/register', async (req, res) => {
    const params = req.body;

    try {
        // Perform necessary operations here, like adding data to the database
        const response = await createAccount(params);

        const user = {id: response.userId, name: params.name};
        const tokens = generateTokens(user);

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

/**
 * Method: POST
 * Handle token refresh
 */
router.post('/refresh-token', async (req, res) => {
    const {token} = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({name: user.name, role: user.role}, accessTokenSecret, {expiresIn: '20m'});

        res.json({
            accessToken
        });
    });
});