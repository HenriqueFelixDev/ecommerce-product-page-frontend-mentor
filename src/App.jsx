import { ProductPage } from './pages/ProductPage'
import { CartProvider } from './providers/CartProvider'

export const App = () => (
  <CartProvider>
    <ProductPage />
  </CartProvider>
)
