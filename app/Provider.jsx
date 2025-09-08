"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
export default function Provider({children}) {

    const {user}= useUser()

    useEffect(()=>{
        user&&CreateNewUser();
    },[user])

    const CreateNewUser=async()=>{
        const result = await axios.post("/api/user",{
            name: user?.fullName ,
            email: user?.primaryEmailAddress?.emailAddress
        })
        console.log(result.data);
    }
  return (
    <div>
      {children}
    </div>
  )
}
