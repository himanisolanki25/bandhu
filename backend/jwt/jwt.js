import jwt from "jsonwebtoken"

const genTokenAndSaveCookie = (userId,res)=>{
    const token = jwt.sign({userId}, process.env.JWT_TOKEN, {
        expiresIn: "10d",
    })
    res.cookie("jwt",token, {
        httpOnly: true, // xss
        secure: true,
        sameSite: "None", // csrf
      })    // jwt being cookie name
}

export default genTokenAndSaveCookie