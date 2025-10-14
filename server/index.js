import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';

dotenv.config();

const app = express();
const server = http.createServer(app);

// middleware
app.use(express.json({ limit: '4mb' }));
app.use(cors());

app.use("/api/status", (req, res) => {
  res.send("Server is running");
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



