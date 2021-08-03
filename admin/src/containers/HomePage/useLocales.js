import { useState, useEffect } from 'react'

export default function useLocales(jwt) {
    const [locales, setLocales] = useState(null)
    const baseUrl = window.location.href.split("/admin/")[0]

    useEffect(()=>{
        fetch(baseUrl + "/i18n/locales",{
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
            .catch(err => console.log(err))
    }, [jwt])
    
    return locales
}
