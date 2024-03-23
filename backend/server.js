const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');

const port = process.env.PORT || 8999;

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:8999', 'http://localhost:5000']
}

app.use(cors(corsOptions));
app.use('/public', express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const start = () => {
    try {
        server.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (e) {
        console.log(e);
    }
}

start();