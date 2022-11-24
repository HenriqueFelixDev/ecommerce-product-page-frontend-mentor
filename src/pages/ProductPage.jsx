import { useEffect, useState } from 'react'

import { AppBar, Button, Gallery, GalleryLightbox, Icons } from '../components'
import { useCart } from '../hooks/useCart'

import productMock from '../assets/json/product.json'
import { formatCurrency } from '../domain/utils/currencyUtils'

const AddToCartButton = ({disabled, onClick}) => (
  <Button disabled={disabled} onClick={onClick} type="primary">
    <Icons icon="cart" />
    <span>Add to cart</span>
  </Button>
)

const QuantityCounter = ({quantity, onIncrement, onDecrement}) => (
  <div className="flex justify-between items-center gap-8">
    <button
      className="px-4 text-orange"
      aria-label="Decrement product quantity"
      onClick={onDecrement}
      >
        <Icons icon="minus" />
    </button>

    <p className="font-bold">
      { quantity }
    </p>

    <button
      className="px-4 text-orange"
      aria-label="Increment product quantity"
      onClick={onIncrement}
      >
        <Icons icon="plus" />
    </button>
  </div>
)

const ProductPrice = ({product}) => (
  <div className="flex justify-between items-center md:flex-col md:items-stretch gap-2">
    <p className="text-xl font-bold">
      <span className="align-middle mr-3">
        { formatCurrency(product.price) }
      </span>
      
      <span className="py-0.5 px-2 rounded-md bg-pale-orange text-orange text-sm font-bold">
        { product.discount * 100 }%
      </span>
    </p>

    <p className="text-xs text-grayish-blue font-bold line-through">
      { formatCurrency(product.originalPrice) }
    </p>
  </div>
)

const ProductActions = ({product}) => {
  const [quantity, setQuantity] = useState(1)

  const { addToCart } = useCart()

  const decrementQuantity = () => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity - 1

      return newQuantity < 0 ? 0 : newQuantity
    })
  }
  
  const incrementQuantity = () =>
      setQuantity(prevQuantity => prevQuantity + 1)

  const addProductToCart = () =>
      addToCart(product, quantity)

  return (
    <footer className="flex flex-col md:flex-row gap-8">
      <QuantityCounter
        quantity={quantity}
        onIncrement={incrementQuantity}
        onDecrement={decrementQuantity}
      />

      <AddToCartButton
        disabled={quantity === 0}
        onClick={addProductToCart}
      />
    </footer>
  )
}

export const ProductPage = () => {
  const [showLightbox, setShowLightbox] = useState(false)

  useEffect(() => {
    document.body.style.overflow = showLightbox ? 'hidden' : 'auto'
  }, [showLightbox])

  const product = productMock

  return (
    <>
      <AppBar />
      <main className="md:my-16 flex flex-col md:flex-row md:gap-24 max-w-4xl container">
        <section className="flex-1">
          <Gallery
            images={product.images}
            onMainImageClick={() => setShowLightbox(true)}
          />

          {showLightbox ? (
            <GalleryLightbox
                images={product.images}
                onCloseClick={() => setShowLightbox(false)}
            />
          ) : null}
        </section>

        <section className="px-4 pb-8 md:p-0 flex-1 space-y-6">
          <p className="mt-10 uppercase text-orange text-xs font-bold">
            { product.brand }
          </p>
          
          <h1 className="text-3xl font-bold">
            { product.name }
          </h1>

          <p className="text-sm text-dark-grayish-blue">
            { product.description }
          </p>

          <ProductPrice product={product} />

          <ProductActions product={product} />
        </section>
      </main>
    </>
  )
}
