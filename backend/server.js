const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const authRoutes = require('./routes/auth');

app.use(express.json());

const path = require('path');

const port = process.env.PORT || 8999;

const corsOptions = {
    credentials: true,
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:8999',
        'http://localhost:5000'
    ]
}

app.use(cors(corsOptions));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/api/auth', authRoutes);

const server = http.createServer(app);

const start = () => {
    try {
        server.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (e) {
        console.log(e);
    }
}

start();