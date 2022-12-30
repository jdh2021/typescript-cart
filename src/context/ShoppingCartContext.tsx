{/* context is a way to manage state globally, 
can be used together with the useState to share state 
between nested components */}

type ShoppingCartProviderProps = {
    // ReactNode is the type given to children property inside React
    children: ReactNode
}

type CartItem = {
    id: number,
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    // takes in id of item and returns item quantity 
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    // total number of items in cart
    cartQuantity: number
    // items in cart
    cartItems: CartItem[]
}

import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart"

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

// provider need objects, wrapper around context that has children object
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    {/* store cart information in local hook useState of type CartItem array */ }
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)
    {/* used in Navbar to open and close cart */}
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id: number) {
        // find item with current id. if found, return quantity. if not, return 0
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: number) {
        // currItems are items in cart
        setCartItems(currItems => {
            // if current item by not found in list, add the item by its id
            if (currItems.find(item => item.id === id) == null) {
                // all of current items and add in new item by id and quantity 1
                return [...currItems, { id, quantity: 1 }]
            } else {
                // map over current items
                return currItems.map(item => {
                    if (item.id === id) {
                        // if current item by id found in cart, keep everything else the same, just update the quantity
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            // if quantity of item found by id is 1, remove it entirely
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                // filter current items to include all except for the id that was passed
                return currItems.filter(item => item.id !== id)
            } else {
                // if quantity of item found by id isn't 1
                // map over current items
                return currItems.map(item => {
                    if (item.id === id) {
                        // if current item found, keep everything else the same, just update the quantity
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems(currItems => {
            // filter current items to include all except for the id of item that was passed
            return currItems.filter(item => item.id !== id)
        })
    }

    // counting up item quantities and return cart quantity variable, default starts at 0
    // for each item, take quantity and item itself and add up total of item plus quantity
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    return (
        <ShoppingCartContext.Provider 
            value={{ 
                getItemQuantity, 
                increaseCartQuantity, 
                decreaseCartQuantity, 
                removeFromCart,
                cartItems,
                cartQuantity,
                openCart,
                closeCart,
            }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}