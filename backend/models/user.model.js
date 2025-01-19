import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },

    // this confirmPassword will give validation error bcz we dont want to store it in database
    // we only want to use it temporarily
    confirmPassword:{
        type:String,
    }
},{timestamps:true})   // createdAt & updatedAt


// used when imported using require("")
// module.exports = mongoose.model("User",userSchema)


const User = mongoose.model("User", userSchema);

export default User;
