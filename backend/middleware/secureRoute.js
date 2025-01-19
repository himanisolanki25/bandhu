import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const secureRoute = async (req,res,next) => {
    try{
         const token = req.cookies.jwt
         if(!token){
            return res.status(400).json({
                success: false,
                message: "Token not found"
            })
         }
         // decode the token
         const decode = jwt.verify(token, process.env.JWT_TOKEN)
         // If the token is valid, decode will always be a truthy object.
         // If the token is invalid, the function will throw an error, skipping any subsequent code inside the try block.
         // if no need to write this if(!decode) code
        //  if(!decode){
        //     return res.status(400).json({
        //         success:false,
        //         message: "Invalid token"
        //     })
        //  }
         
         const user = await User.findById(decode.userId).select("-password")
         if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
         }

         req.user = user          // comparing if req.user is equal to user to check if user is 
         // logged in to show all users

         next()

    } catch (error){
        console.log(error)
        res.status(500).json({
            error: "Error in secureRoute middleware"
        })
    }
}

export default secureRoute