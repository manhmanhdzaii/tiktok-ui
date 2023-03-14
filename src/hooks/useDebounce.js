import { useState, useEffect } from "react"

function useDebounce(value, delay) {
    const [deboundValue, setDeboundValue] = useState(value);

    useEffect(()=>{
        const handler = setTimeout(() => setDeboundValue(value), delay);
        
        return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return deboundValue;
}

export default useDebounce
