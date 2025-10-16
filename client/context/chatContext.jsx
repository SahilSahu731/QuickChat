import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import toast from "react-hot-toast";


export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
    const [users, setUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const {socket, axios} = useContext(AuthContext)

    // get all user
    const getUsers = async () => {
        try {
            const {data} = await axios.get("/api/messages/users");
            if(data.success){
                setUser(data.users);
                setUnseenMessages(data.unseenMessages);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    //get message for sleected user
    const getMessages = async (userId) => {
        try {
            const {data} = await axios.get(`/api/messages/${userId}`);
            if(data.success){
                setMessages(data.messages);
                const user = users.find(u => u._id === userId);
                setSelectedUser(user || { _id: userId });
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // send message
    const sendMessage = async (messageData) => {
        try {
            const userId = selectedUser?._id || selectedUser;
            const {data} = await axios.post(`/api/messages/send/${userId}`, messageData);
            if(data.success){
                setMessages((prevMsg) => [...prevMsg, data.newMessage]);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const subscribeToMessages = async () => {
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                newMessage.seen = true;
                setMessages((prevMsg) => [...prevMsg, newMessage]);
                axios.put(`/api/messages/mark/${selectedUser._id}`);
            } else {
                setUnseenMessages((prevUnseenMsg) => ({
                     ...prevUnseenMsg,
                     [newMessage.senderId]: (prevUnseenMsg[newMessage.senderId] || 0) + 1
                }))
            }
        })
    }

    const unsubscribeToMessages = () => {
        if (!socket) return;
        socket.off("newMessage");
    }

    useEffect(() => {
        subscribeToMessages();
        return () => unsubscribeToMessages();
    }, [selectedUser, socket])

    const value = {
        messages, users, selectedUser, unseenMessages, setSelectedUser, getUsers, getMessages, sendMessage, setMessages, setUnseenMessages,
    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}