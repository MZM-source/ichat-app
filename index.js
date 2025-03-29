// const io = require('socket.io')(80);
// const users = {};

// io.on('connection', Socket =>{
//     Socket.on('New-user-joined', name =>{
//         console.log("a new person in the chat", name);
//         users[Socket.id] = name;
//         Socket.broadcast.emit('user-joined', name);
//     });

//     Socket.on('send', message =>{
//         Socket.broadcast.emit('receive', {message: message, name: users[Socket.id]});
//     });
// });
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('new-user-joined', (name) => {
    socket.broadcast.emit('user-joined', name);
  });

  socket.on('send', (message) => {
    socket.broadcast.emit('receive', message);
  });
});

http.listen(80, () => {
  console.log('listening on *:80');
});