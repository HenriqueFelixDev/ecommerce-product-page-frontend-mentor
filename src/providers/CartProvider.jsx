import { createContext, useState } from 'react'

export const CartContext = createContext({
    cart: {},
    addToCart: (product, quantity) => {},
    removeFromCart: (productId) => {},
})

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState({})

    const addToCart = (product, quantity) => {
        setCart(prevState => {
            const newCartProduct = {
                product,
                quantity
            }

            return {
                ...prevState,
                [product.id]: newCartProduct
            }
        })
    }

    const removeFromCart = productId => {
        setCart(prevState => {
            const {
                [productId]: removedProduct,
                ...restProducts
            } = prevState

            return restProducts
        })
    }

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart}}>
            { children }
        </CartContext.Provider>
    )
}