const express = require('express');

/**
 * 
 * @param {express.Application} app 
 * @param {*} io 
 * @returns 
 */
module.exports.create = (app, io) => {
    return {
        addRoute(route, eventName, path, handler) {
            app.use(route, (req, res) => {
                const data = { id: req.params.id };
                handler(data, (result) => {
                    res.send(result);
                });
            });

            // Register Socket.IO event listener
            io.on('connection', (socket) => {
                socket.on(eventName, (data) => {
                    handler(data, (result) => {
                        socket.emit('response', result);
                    });
                });
            });
        }
    }
}