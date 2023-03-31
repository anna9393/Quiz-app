const express = require('express');
const path = require('path');
const connection = require('./services/connect-dtb.js');

const homeRouter = require('./routers/home.router');
const apiRouter = require('./routers/api.router');

const app = express();
const PORT = 3000;

app.use(homeRouter);
app.use('/api', apiRouter);
app.use('/static', express.static(path.join(__dirname, '/static')));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});