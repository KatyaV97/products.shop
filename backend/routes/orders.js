const express = require('express');
const router = express.Router();
const connection =require('../db');

router.get('/getOrders/', async (req, res) => {
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

router.delete('/deleteOrder/', async (req, res) => {
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