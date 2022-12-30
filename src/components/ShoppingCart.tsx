import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartItems } = useShoppingCart()
    // Offcanvas is slide-in effect from Bootstrap
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    Cart
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={2}>
                    {/* loop through all of the cart items (provided by ShoppingCartContext) */}
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                   <div className="ms-auto fw-bold fs-5">
                        {/* take cartItem and reduce to single value} */}
                        Total {formatCurrency(cartItems.reduce((total, cartItem) => {
                            {/* get individual item from storeItems} */ }
                            const item = storeItems.find(i => i.id === cartItem.id)
                            return total + (item?.price || 0) * cartItem.quantity
                            }, 0)
                        )}
                    </div>    
                </Stack>  
            </Offcanvas.Body>
        </Offcanvas>
    )
}