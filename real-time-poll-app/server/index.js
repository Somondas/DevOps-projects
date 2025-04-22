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

io.on("connection", (socket) => {
  log("A usre connected: ", socket.id);

  socket.emit("currentVotes", votes);
});
