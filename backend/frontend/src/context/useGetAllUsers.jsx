import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import axios from "axios"

const useGetAllUsers = () => {
    const[allUsers, setAllUsers]=useState([]);    // allUsers is a function
    const[loading, setLoading]=useState(false);    // loading is a variable
    useEffect(()=>{
        const getUsers=async()=>{
            setLoading(true)
            try{
                const token=Cookies.get("jwt")
                const response=await axios.get("/api/user/allusers",{
                    credentials:"include",
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                setAllUsers(response.data)
                setLoading(false)
            } catch(error){
                console.log("Errors in useGetAllUsers: " + error)
            }
        }
        getUsers()
    },[])
    return[allUsers, loading]   // now by returning we can use these anywhere. these two have the data we want
}

export default useGetAllUsers