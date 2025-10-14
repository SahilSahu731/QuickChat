import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import connectDB from "./lib/db.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";



dotenv.config();

const app = express();
const server = http.createServer(app);

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

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
