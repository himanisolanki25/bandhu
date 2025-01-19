import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genTokenAndSaveCookie from "../jwt/jwt.js"

export const signup = async (req,res)=>{
  try{
    // take data from request ki body
    const {fullname,email,password,confirmPassword}=req.body;

    // check if password and confnirm password are same
    if(password!== confirmPassword){
      return res.status(400).json({
        error: "Password and Confirm password fields are not same"
      })
    }
    // check if email is already registered
    const user = await User.findOne({email})

    if(user){
      return res.status(400).json({
        error: "User already exists"
      })
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password,10)

    // if email not present => save the entries in database
    const newUser = await new User({
      fullname,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    // generate JWT token
    genTokenAndSaveCookie(newUser._id,res);

    // send response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email:newUser.email,
      }
    })

  } catch(error) {
    console.log(error)
    res.status(400).json({
      error: "Error while registering. Please try later"
    })
  }
}

export const login = async (req, res)=>{
  try{
    const {email,password} = req.body

    // check if user is already registered
    const user = await User.findOne({email})
    
    // check if password is correct 
    // const ifPassword = await bcrypt.compare(password, user.password)
    // AGAR USER PRESENT NHI H TO PASSWORD KAISE READ KAREGA ISLIYE YAHA NHI LIKHENGE

    if(!user || !(await bcrypt.compare(password, user.password))){
      return res.status(400).json({
        error: "Invalid user credentials"
      })
    }

    // create token and save cookie
    genTokenAndSaveCookie(user._id, res)

    // send response
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email
      }
    })

  } catch(error){
    console.log(error)
    res.status(500).json({ error: "Error while logging in. Please try later"})
  }
}

export const logout = async (req, res) => {
  try{
    res.clearCookie("jwt")
    res.status(201).json({message: "User logged out successfully"})
  } catch(error){
    console.log(error)
    res.status(500).json({error: "Error while logging out. Please try later"})
  }
}

export const allUsers = async (req, res) => {
  try{
    const loggedInUser = req.user._id
    const filteredUser = await User.find({
      _id: {$ne: loggedInUser},
    }).select("-password")
    res.status(201).json(filteredUser)
  } catch(error) {
    console.log("Error while fetching all users: " + error)
  }
}