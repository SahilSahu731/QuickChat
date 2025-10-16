# QuickChat 💬

A real-time chat application built with the MERN stack and Socket.IO, featuring instant messaging, image sharing, and online status tracking.

## ✨ Features

- 🔐 User authentication (Sign up/Login)
- 💬 Real-time messaging with Socket.IO
- 📷 Image sharing with Cloudinary integration
- 👥 Online/Offline user status
- 🔔 Unread message notifications
- 📱 Responsive design with Tailwind CSS
- ⚡ Fast and smooth user experience

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Socket.IO Client
- Axios
- React Router DOM
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO
- JWT Authentication
- Cloudinary (Image storage)
- Bcrypt.js (Password hashing)

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account

## 🚀 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd QuickChat
```

### 2. Server Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

### 3. Client Setup

```bash
cd client
npm install
```

Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:3000
```

## 🏃 Running the Application

### Start the server
```bash
cd server
npm run dev
```

### Start the client
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## 📁 Project Structure

```
QuickChat/
├── client/                 # Frontend React application
│   ├── context/           # React Context (Auth & Chat)
│   ├── src/
│   │   ├── assets/        # Images and static files
│   │   ├── components/    # React components
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   └── App.jsx        # Main App component
│   └── package.json
│
└── server/                # Backend Node.js application
    ├── controllers/       # Route controllers
    ├── lib/              # Database & utilities
    ├── middleware/       # Auth middleware
    ├── model/            # MongoDB models
    ├── routes/           # API routes
    ├── index.js          # Server entry point
    └── package.json
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/check` - Check authentication status
- `PUT /api/auth/update-profile` - Update user profile

### Messages
- `GET /api/messages/users` - Get all users with unread message counts
- `GET /api/messages/:id` - Get messages with specific user
- `POST /api/messages/send/:id` - Send message to user
- `PUT /api/messages/mark/:id` - Mark messages as seen

## 🔌 Socket Events

### Client → Server
- `connection` - User connects with userId

### Server → Client
- `getOnlineUsers` - Receive list of online users
- `newMessage` - Receive new message in real-time

## 🎨 Features in Detail

### Real-time Messaging
Messages are delivered instantly using Socket.IO, providing a seamless chat experience.

### Image Sharing
Users can share images which are automatically uploaded to Cloudinary and displayed in the chat.

### Online Status
See which users are currently online with real-time status updates.

### Unread Messages
Track unread messages from different users with notification badges.

## 🔒 Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Protected routes with middleware
- CORS enabled for secure cross-origin requests

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Sahil Sahu

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if you like this project!
