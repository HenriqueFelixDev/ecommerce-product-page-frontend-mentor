import { Button } from "../Button"
import { Icons } from '../Icons'
import { useCart } from '../../hooks/useCart'
import { formatCurrency } from '../../domain/utils/currencyUtils'

const EmptyCart = () => (
    <div className="flex-1 flex items-center justify-center">
        <p className="font-bold text-dark-grayish-blue">
            Your cart is empty.
        </p>
    </div>
)

const CartProductCard = ({cartProduct, onRemoveClick}) => {
    const { product, quantity } = cartProduct

    const formattedPrice = `${formatCurrency(product.price)} x ${quantity}`
    const subtotal = formatCurrency(product.price * quantity)

    return (
        <article className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-md overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src={product.images[0].thumbnail}
                    alt={`Thumbnail of ${product.name}`}
                />
            </div>

            <div className="flex-1 text-dark-grayish-blue">
                <h2>{product.name}</h2>

                <p>
                    {formattedPrice}{' '}
                    <span className="font-bold text-black">
                        { subtotal }
                    </span>
                </p>
            </div>

            <button
                className="text-grayish-blue"
                onClick={onRemoveClick}
                aria-label="Remove product from cart"
                >
                    <Icons icon="delete" />
            </button>
        </article>
    )
}

const FilledCart = ({cart, onRemoveClick}) => (
    <div className="space-y-4">
        {Object.values(cart).map(cartProduct => (
            <CartProductCard
                cartProduct={cartProduct}
                onRemoveClick={() => onRemoveClick(cartProduct.product.id)}
            />
        ))}
        
        <Button className="w-full">
            Checkout
        </Button>
    </div>
)


export const CartBasket = () => {
    const { cart, removeFromCart } = useCart()

    const productsCount = Object.entries(cart).length

    return (
        <section className="absolute top-24 md:top-4 right-0 left-0 md:left-auto z-40 py-8 px-4 md:p-2 m-3 flex flex-col text-sm rounded-md border border-gray-200 bg-white shadow-lg md:w-80 min-h-[150px]">
            <h2 className="font-bold mb-8">Cart</h2>
            
            {productsCount === 0 
                ? <EmptyCart /> 
                : <FilledCart cart={cart} onRemoveClick={removeFromCart} />
            }
        </section>
    )
}