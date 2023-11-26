require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const socketIO = require('socket.io');
const mongoose = require('mongoose')
const publicRoutes = require('./routes/publicRoutes')
const userRoutes = require('./routes/userRoutes')


// express app
const app = express()

// middleware
app.use(express.json())

app.use(bodyParser.urlencoded({extended: true}))

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//socket io
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('codeChange', (newCode) => {
    socket.broadcast.emit('codeChange', newCode);
  });

  socket.on('startTyping', () => {
    const username = socket.username || 'User';
    socket.broadcast.emit('typing', `${username} is typing...`);
  });

  socket.on('stopTyping', () => {
    socket.broadcast.emit('typing', '');
  });

  socket.on('disconnect', () => {
    const username = socket.username || 'User';
    io.emit('typing', `${username} has left the editor`);
    console.log(`${username} disconnected`);
  });
});

//routes
app.use('/api', publicRoutes)
app.use('/api/paste', userRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })