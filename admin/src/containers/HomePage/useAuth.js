import { useState, useEffect } from 'react'

export default function useAuth(user,password,submit) {
   const [jwt, setJwt] = useState()
   const baseUrl = window.location.href.split("/admin/")[0]

   useEffect(()=>{
        fetch(baseUrl + '/auth/local',{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                "identifier": user,
                "password": password
            })
        }).then(res => res.json()).then(data => setJwt(data.jwt))
   }, [submit])

   return jwt
}
