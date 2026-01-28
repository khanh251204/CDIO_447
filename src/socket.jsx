// src/socket.js
import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
    transports: ["websocket"],   // tránh lỗi polling 404
    withCredentials: true,
    autoConnect: false
});
