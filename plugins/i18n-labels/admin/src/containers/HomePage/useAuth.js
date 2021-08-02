import React from 'react'
import { useState, useEffect } from 'react'

export default function useAuth() {
   const [jwt, setJwt] = useState()

   useEffect(()=>{
        fetch('http://localhost:1337/auth/local',{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                "identifier": "admin",
                "password": "12345678"
            })
        }).then(res => res.json()).then(data => setJwt(data.jwt))
   }, [])

   return jwt
}
