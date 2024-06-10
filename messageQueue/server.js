const messageService = require("./services/consumerQueue.service");
const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const cors = require("cors");

const app = express();
const server = createServer(app);

// app.get("/", (req, res) => {
//   res.sendFile(join(__dirname, "index.html"));
// });
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: "*",
    credentials: true,
  },
});
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
    allowedHeaders: "*", // Allow all headers
    // credentials: true,
  })
);
io.use((socket, next) => {
  const { email, name, _id } = socket.handshake.auth;
  socket.email = email;
  socket.name = name;
  socket._id = _id;
  next();
});
io.on("connection", (socket) => {
  let users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      socketId: id,
      email: socket.email,
      userId: socket._id,
      name: socket.name,
    });
  }
  io.emit("update_users", users);
  socket.join(socket._id);
  socket.on("join_conversation", (e) => {
    e.forEach((i) => {
      console.log("connect to", i.room.id);
      socket.join(i.room.id);
    });
  });
  socket.on("disconnect", () => {
    let users1 = [];
    for (let [id, socket] of io.of("/").sockets) {
      users1.push({
        socketId: id,
        email: socket.email,
        userId: socket._id,
        name: socket.name,
      });
    }
    io.emit("update_users", users1);
    socket.broadcast.emit("hello", "adadada");
  });
  socket.on("private_message", (ms) => {
    socket.to(ms.room.id).emit("private_message", ms);
  });
});
messageService
  .consomerNotification(io)
  .then(() => {
    console.log("notification queue is running");
  })
  .catch((error) => console.log(error));
server.listen(7000, () => {
  console.log("server running at http://localhost:7000");
});
