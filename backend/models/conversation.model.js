import mongoose from "mongoose"
import User from "./user.model.js"
import Message from "./message.model.js"

const conversationSchema = new mongoose.Schema(
    {
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:User,
            }
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:Message,
                default:[],
            }
        ]
    },
    {timestamps: true}
)

// used when imported using require
// module.exports = mongoose.model("Conversation",conversationSchema)

const Conversation = mongoose.model("conversation", conversationSchema);
export default Conversation;
