console.log("5255");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cros = require("cors");
const app = express();
app.use(cros());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:1234",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("userconnected", socket.id);
  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("server running: 3001");
});
