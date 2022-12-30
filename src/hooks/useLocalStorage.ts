
import { useEffect, useState } from "react"

/**
useLocalStorage should work with custom generic types as well as props.
initial value is either generic type T or function that returns type of T
*/

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    // only want to invoke checking local storage once, not on every rerender
    const [value, setValue] = useState<T>(() => {
        // get JSON value 
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)
        // check type of initialValue
        if (typeof initialValue === "function") {
            // initial value is a type of invokable funcion that returns type of T to tell TypeScript that T cannot be a function
            return (initialValue as () =>T)()
        } else {
            return initialValue
        }
    })

    // runs every time key or value changes and stores value in local storage
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))}, [key, value])

    // explicitly tell TypeScript this will be array of specific types because cartItems, setCartItems has both values of CartItem[] and setState
    return [value, setValue] as [typeof value, typeof setValue]
}