const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { Socket } = require("dgram");
const { log } = require("console");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const votes = {
  Yes: 0,
  No: 0,
  "I never worked with Web Sockets": 0,
};
const ios = {
  Yes: 0,
  No: 0,
};

io.on("connection", (socket) => {
  log("A user connected: ", socket.id);

  socket.emit("currentVotes", votes);

  socket.on("vote", (option) => {
    if (votes.hasOwnProperty(option)) {
      votes[option]++;
      io.emit("currentVotes", votes);
      log(votes);
    }
  });
  socket.on("socketio", (option) => {
    if (ios.hasOwnProperty(option)) {
      ios[option]++;
      io.emit("knowSocket", ios);
      log(ios);
    }
  });
  socket.on("disconnect", () => {
    log("User disconnected: ", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server listening on http://localhost:3001");
});
