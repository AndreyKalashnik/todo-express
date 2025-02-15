const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.use((req, res, next) => {
    console.log(`Request Type: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    next();
});

app.use('/static', express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
