import Message from "../model/message.model.js";
import User from "../model/user.model.js";


export const getAllUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({_id : {$ne : userId}}).select("-password");

        //count no of messages
        const unseenMessages = {}
        const promises = filteredUsers.map(async (user) => {
            const messages = await Message.find({
                senderId : user._id,
                receiverId : userId,
                seen : false,
            })
            if (messages.length > 0) {
                unseenMessages[user._id] = messages.length;
            }
        })
        await Promise.all(promises);
        res.json({
            success : true,
            message : "Users fetched successfully",
            users : filteredUsers,
            unseenMessages,
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success : false,
            message : "Internal server error : " + error.message
        })
    }
}

// get all messages for selected user
export const getMessages = async (req, res) => {
    try {
        const {id : selectedUserId} = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or : [
                {senderId : myId, receiverId : selectedUserId},
                {senderId : selectedUserId, receiverId : myId},
            ]
        })
        await Message.updateMany({senderId : selectedUserId, receiverId : myId},{
            seen : true,
        })
        res.json({
            success : true,
            message : "Messages fetched successfully",
            messages,
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success : false,
            message : "Internal server error : " + error.message
        })
    }
}

// mark messages as seen using message Id
export const markMessagesAsSeen = async (req, res) => {
    try {
        const {id} = req.params;
        await Message.findByIdAndUpdate(id,{
            seen : true,
        })
        res.json({
            success : true,
            message : "Message marked as seen successfully",
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success : false,
            message : "Internal server error : " + error.message
        })
    }
}
