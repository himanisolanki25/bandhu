import mongoose from "mongoose";
import User from "./user.model.js";

const messageSchema = new mongoose.Schema(
    {
        senderId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type:String,
            required: true,
        }
    },
    { timestamps : true}
)

// used when imported using require
// module.exports = mongoose.model("Message",messageSchema)

const Message = mongoose.model("message", messageSchema);
export default Message;
