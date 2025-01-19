import React, { createContext, useContext, useState } from 'react'
import Cookies from "js-cookie"

export const AuthContext=createContext()

export const AuthProvider = ({children}) => {      // all the components are children
    const initialUserState = Cookies.get("jwt") || localStorage.getItem("ChatApp")

    // parse the user data and storing in state
    const[authUser, setAuthUser] = useState(initialUserState ? JSON.parse(initialUserState) : undefined)
    console.log("Authuser is: ",authUser)
    return(
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);