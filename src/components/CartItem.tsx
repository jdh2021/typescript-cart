import { Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/items.json"

type CartItemProps = {
    id: number
    quantity: number
}

export function CartItem({id, quantity}: CartItemProps) {
    const { removeFromCart } = useShoppingCart()
    // get item (name, price) from storeItems (JSON), find the item by item id
    const item = storeItems.find( i => i.id === id)
    // if item can't be located/doesn't exist, return null
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img 
                src={item.imgUrl} 
                style={{width: "115px", height: "75px", objectFit: "cover" }}/>
        </Stack>
  
    )
}