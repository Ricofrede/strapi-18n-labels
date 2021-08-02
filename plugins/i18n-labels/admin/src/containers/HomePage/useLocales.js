import React from 'react'
import { useState, useEffect } from 'react'
import useAuth from './useAuth'

export default function useLocales(jwt) {
    const [locales, setLocales] = useState(null)

    useEffect(()=>{
        fetch("http://localhost:1337/i18n/locales",{
            method: "GET",
            headers: {
              "Content-Type" : "text/plain",
              "Authorization": `Bearer ${jwt}`
            }
          })
            .then(res => res.json())
            .then(data => {
                const listLocs = []
                data.map(loc => {
                    listLocs.push(loc.code)
                })
                setLocales(listLocs)
            })
    }, [])
    
    return locales
}
