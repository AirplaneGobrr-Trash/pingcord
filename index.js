const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var cookieParser = require('cookie-parser');

const functions = require("./functions")
app.use(cookieParser());

//views
app.set('view engine', 'ejs');
//public
app.use(express.static('public'))

app.use((req, res, next) => { return next(); });

app.get('/', (req, res, next) => {
    res.render("pingcord")
});

io.on('connection', (socket) => {
    console.log('a user connected');
  });

  server.listen(80, () => {
    console.log('listening on *:3000');
  });