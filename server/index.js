/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomInt } = require('crypto');
const request = require('request');
const cheerio = require('cheerio');
const axios = require("axios");
const fs = require('fs')
const formatMessage = require('./utils/message');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/user');
const models = require('./models');
const rootDir = process.cwd();
const app = express();

const PORT = 8000;

app.use(cors());

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use("/jobs", express.static(rootDir + "/uploads/jobs"))
app.use("/profile", express.static(rootDir + "/uploads/profile"))
app.use("/bg_profile", express.static(rootDir + "/uploads/bg_profile"))

// limit 50mb, kalo gak di set akan error kalo data api yang dikirim besar.
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

const server = app.listen(PORT,() => {
  console.log(`Server is listening to port ${PORT}`)
})

const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const botName = 'ChatCord Bot';
io.on("connection", socket => {
  socket.on('joinRoom', ({ username, room }) => {
    console.log(`${username} telah masuk ke ${room}`)
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  })


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