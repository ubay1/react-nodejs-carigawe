/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomInt } = require('crypto');
const formatMessage = require('./utils/message');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/user');

const models = require('./models');

const app = express();

const PORT = 8000;

app.use(cors());
// set the view engine to ejs
app.set('view engine', 'ejs');

// limit 50mb, kalo gak di set akan error kalo data api yang dikirim besar.
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const server = app.listen(PORT,() => {
    console.log(`Server is listening to port ${PORT}`)
})

const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// let interval;
// function dataSocket(socket) {
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => {
//     const data = randomInt(10)
//     getApiAndEmit(socket, data)
//   }, 1000);
//   socket.emit("FromAPI", randomInt(1000)); 
//   socket.on("disconnect", () => {
//     clearInterval(interval);
//   });
// }

const botName = 'ChatCord Bot';
io.on("connection", socket => {
  socket.on('joinRoom', ({ username, room }) => {
    console.log(`${username} telah masuk ke ${room}`)
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    // socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

    // Broadcast when a user connects
    // socket.broadcast.to(user.room)
    // .emit(
    //   'message',
    //   formatMessage(botName, `${user.username} has joined the chat`)
    // );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  })
  
  // Listen for postJob
  socket.on('postJob', data => {
    // io.emit('getNewDataJob', 'dapet bos');
    // const user = getCurrentUser(socket.id);
    // console.log(user)
    // io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', (id) => {
    const user = userLeave(socket.id);
    
    console.log('telah keluar dari room_beranda')

    // jika ada user yang keluar, akan diperbarui dan dikirim ulang data yang terbaru.
    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

const routes = require('./routes/index');
app.use('/api', routes);

const routesAllJob = require('./routes/getAllJob')(io);
app.use('/api/', routesAllJob);