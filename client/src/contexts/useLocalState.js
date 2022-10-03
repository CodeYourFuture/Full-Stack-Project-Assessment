import {useState, useEffect} from 'react'

function useLocalState(key, initial) {
    const [value, setValue ] = useState(()=>{
        if( typeof window !== 'undefined'){
            const savedValue = window.localStorage.getItem(key);
            if(savedValue !== null) return JSON.parse(savedValue)
        }
        return initial;
    })
    useEffect(()=>{
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

  return [value, setValue];
}


export default useLocalState
