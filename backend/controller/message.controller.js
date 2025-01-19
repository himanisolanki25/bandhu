import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getReceiverSocketId, io } from "../socketIO/server.js";

export const sendMessage = async (req, res) => {
    try{
        const {message} = req.body
        const {id: receiverId} = req.params
        const senderId = req.user._id    // loggedin user

        // find if a conversation between sender and receiver already exist
        // used let because we will reassign conversation
        let conversation = await Conversation.findOne({
            members: {$all: [receiverId, senderId]}
        })

        // if no conversation between sender and receiver then create one
        if(!conversation){
            conversation = await Conversation.create({
                members: [receiverId, senderId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        // await conversation.save()
        // await newMessage.save();
        await Promise.all([conversation.save(), newMessage.save()]); // run parallel
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);

    } catch(error){
        console.log(error)
        res.status(500).json({
            error: "Something wrong in the sendMessage controller"
        })
    }
}

// get all messages of a chat
export const getMessage = async (req, res) => {
    try{
        const {id: chatUser} = req.params
        const senderId =req.user._id
        const conversation = await Conversation.findOne({
            members: {$all: [senderId, chatUser]}
        }).populate("messages")

        // if no conversation
        if(!conversation){
            return res.status(201).json([])
        }

        const messages = conversation.messages

        res.status(201).json(messages)
    } catch(error) {
        console.log("Error while getting messages: ", error)
        res.status(500).json({
            error: "something wrong with getMessage controller"
        })
    }
}