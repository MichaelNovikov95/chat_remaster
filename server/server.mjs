import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 8080;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const messages = [];
const allRooms = [];

io.on("connection", async (socket) => {
  const users = [];

  const sockets = await io.fetchSockets();
  sockets.forEach((sock) => {
    for (const s of sock.adapter.rooms.keys()) {
      users.push(s);
    }
  });

  socket.emit("users-online", users, socket.id);

  socket.emit("init", socket.id, allRooms);

  socket.broadcast.emit("new-connection", socket.id);

  socket.emit("update-users", users);

  socket.on("send-msg", (message, room) => {
    const newMessage = { message, user: socket.id };
    if (room === "") {
      io.emit("read-msg", newMessage);
    } else {
      io.to(room).emit("read-msg", newMessage);
    }
  });

  socket.on("create-room", (rooms, room, id) => {
    allRooms.push(room);
    io.emit("avaliable-room", rooms, room, id);
  });

  socket.on("join-room", (room, user) => {
    socket.join(room);
    io.to(room).emit("new-room-member", user);
  });

  socket.on("leave-room", (room, user) => {
    io.to(room).emit("leaving-room", room, user);
    socket.leave(room);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("disconnection", socket.id);
  });
});

server.listen(PORT);
