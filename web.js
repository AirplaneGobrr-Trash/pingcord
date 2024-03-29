// Web.js:
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*"} });

const cors = require('cors')
// EJS import

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cors({ origin: "*"}))


module.exports = {
    express, app,http,io, server
}

// Web: <script src='/socket.io/socket.io.js'></script>