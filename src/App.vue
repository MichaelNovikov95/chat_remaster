<template>
  <div>
    <HeaderComponent :id="userId" :choosenRoom="choosenRoom" />
    <Rooms
      :toGeneral="toGeneral"
      :choosenRoom="choosenRoom"
      :rooms="rooms"
      :chooseRoom="chooseRoom"
    />
    <UsersComponent :onlineUsers="onlineUsers" />
    <Forms
      :sendMessage="sendMessage"
      :createRoom="createRoom"
      v-model="formData"
    />
    <Messages :messages="messages" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from "vue";
import { socket } from "./config/socket.ts";

import { IMessages, User, Room } from "./interfaces/index.ts";

import {
  HeaderComponent,
  Rooms,
  Forms,
  Messages,
  UsersComponent,
} from "./components/index.ts";

const userId = ref("");
const messages = ref<IMessages[]>([]);
const users = ref<User[]>([]);
const rooms = ref<Room[]>([]);
const choosenRoom = ref("");
const formData = reactive({
  message: "",
  room: "",
});

onMounted(() => {
  socket.on("init", (id, allRooms) => {
    userId.value = id;
    rooms.value = allRooms;
  });
});

const msgRefresh = setInterval(() => {
  if (messages.value.length > 0) {
    messages.value.shift();
  } else {
    clearInterval(msgRefresh);
  }
}, 15000);

const onlineUsers = computed(() => {
  socket.on("users-online", (users_online, id) => {
    const parsedUsers = [...new Set(users_online)] as string[];
    if (parsedUsers.length === 0) return;
    const filteredUsersById = parsedUsers.filter((u) => u !== id);
    users.value = filteredUsersById;
  });
  return users.value;
});

function sendMessage() {
  socket.emit("send-msg", formData.message, choosenRoom.value);
  formData.message = "";
}

socket.on("read-msg", ({ message, user }) => {
  if (userId.value === user)
    return messages.value.push({ message, user: "You" });

  return messages.value.push({ message, user });
});

function createRoom() {
  rooms.value.push(formData.room);
  socket.emit("create-room", rooms.value, formData.room, userId.value);
  formData.room = "";
}

socket.on("avaliable-room", (allRooms, room, user) => {
  rooms.value = allRooms;
  if (userId.value === user) {
    return messages.value.push({
      message: `created a new room ${room}`,
      user: "You",
    });
  }
  return messages.value.push({
    message: `created a new room ${room}`,
    user,
  });
});

function chooseRoom(room: string) {
  choosenRoom.value = room;
  socket.emit("join-room", room, userId.value);
}

function toGeneral() {
  socket.emit("leave-room", choosenRoom.value, userId.value);
  choosenRoom.value = "";
}

socket.on("leaving-room", (room, user) => {
  if (userId.value === user)
    return messages.value.push({
      message: `leaved a room ${room}`,
      user: "You",
    });
  return messages.value.push({ message: `leaved a room ${room}`, user: user });
});

socket.on("new-room-member", (user) => {
  if (userId.value === user)
    return messages.value.push({
      message: `joined a room ${choosenRoom.value}`,
      user: "You",
    });
  return messages.value.push({ message: "joined a room", user });
});

socket.on("new-connection", (id) => {
  users.value.push(id);
  messages.value.push({
    message: `User ${id} joined a channel`,
    user: "system",
  });
});

socket.on("disconnection", (id) => {
  users.value = users.value.filter((user) => user !== id);
  messages.value.push({
    message: `User ${id} left the channel`,
    user: "system",
  });
});
</script>
