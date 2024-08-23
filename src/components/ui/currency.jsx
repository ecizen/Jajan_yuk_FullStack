'use client'

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    style: "currency",
    currency: "IDR",
  });

  

const Currency = ({
    className,
    value
}) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return ( 
        <div className={className}>
            {formatter.format(Number(value))}
        </div>
     );
}
 
export default Currency;