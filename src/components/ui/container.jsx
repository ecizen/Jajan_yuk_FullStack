import { useEffect, useState } from "react"

const Container = ({children}) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    }, [])

    if(!isMounted){
        return null
    }
    return (
        <div className="mx-auto max-w-7xl">
            {children}
        </div>
    )
}

export default Container;