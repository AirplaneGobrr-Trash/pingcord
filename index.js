const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use((req, res, next) => { return next(); });

app.get('/', (req, res, next) => {
    r
});

app.ws('/ws', (ws, req) => {
    ws.on('message', (msg) => {
        console.log(msg);
    });
    console.log('socket', req.testing);
});

app.listen(80);