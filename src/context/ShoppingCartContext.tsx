{/* context is a way to manage state globally, 
can be used together with the useState to share state 
between nested components */}

type ShoppingCartProviderProps = {
    // ReactNode is the type given to children property inside React
    children: ReactNode
}

import { createContext, ReactNode, useContext } from "react";

const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

// provider need objects, wrapper around context that has children object
export function ShoppingCartProvider({children} : ShoppingCartProviderProps) {
    return (
    <ShoppingCartContext.Provider value={{}}>
        {children}
    </ShoppingCartContext.Provider>
    )
}