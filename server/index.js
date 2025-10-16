import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import connectDB from "./lib/db.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

export const userSocketMap = {};

// socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("user connected", userId);
  if (userId) {
    userSocketMap[userId] = socket.id;
  }
  // emit online users to all
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// api routes
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

app.use("/api/status", (req, res) => {
  res.send("Server is running");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB();

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default server;