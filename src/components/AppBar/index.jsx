import { useMemo, useState } from 'react'

import { ProfilePhoto } from '../ProfilePhoto'
import { CartBasket } from '../CartBasket'
import { Icons } from '../Icons'
import { Badge } from '../Badge'
import { useCart } from '../../hooks/useCart'
import avatarImage from '../../assets/images/image-avatar.png'

const MenuItem = ({children}) => (
    <a
        className="border-b-4 border-transparent hover:border-orange md:py-8 md:text-sm font-bold md:font-normal md:text-dark-grayish-blue hover:text-very-dark-blue transition-all"
        href="javascript:void(0);"
        >
            { children }
    </a>
)

const Menu = ({show, onCloseClick}) => (
    <nav
        onClick={onCloseClick}
        className={`${show ? 'block' : 'hidden'} flex-1 md:block fixed md:static z-50 inset-0 bg-black md:bg-transparent bg-opacity-50`}
        >
        <div
            className="h-full w-4/6 p-8 md:p-0 flex flex-col md:flex-row items-start gap-4 bg-white"
            onClick={e => e.stopPropagation()}
            >
            <button
                className="mb-8 md:hidden text-dark-grayish-blue"
                onClick={onCloseClick}
                aria-label="Hide menu"
                >
                    <Icons icon="close" />
            </button>
            
            <MenuItem>Collections</MenuItem>
            <MenuItem>Men</MenuItem>
            <MenuItem>Women</MenuItem>
            <MenuItem>About</MenuItem>
            <MenuItem>Contact</MenuItem>
        </div>
    </nav>
)

const CartButton = () => {
    const [showCartBasket, setShowCartBasket] = useState(false)
    const { cart } = useCart()

    const totalProductsCount = useMemo(() => {
        return Object.values(cart).reduce((acc, currentCartProduct) => {
            return acc + currentCartProduct.quantity
        }, 0)
    }, [cart])

    const toggleShowCartBasket = () =>
        setShowCartBasket(prevState => !prevState)

    return (
        <div className="md:relative">
            <button
                onClick={toggleShowCartBasket}
                className="relative"
                aria-label="Show products cart"
                >
                    <Icons icon="cart" />

                    {totalProductsCount > 0 ? (
                        <Badge>{ totalProductsCount }</Badge>
                    ) : null}
            </button>

            {showCartBasket ? <CartBasket /> : null}
        </div>
    )
}

export const AppBar = () => {
    const [showMenu, setShowMenu] = useState(false)

    const openMenu = () => setShowMenu(true)

    const hideMenu = () => setShowMenu(false)

    return (
        <header>
            <div className="flex items-center gap-4 md:gap-10 px-4 h-24 max-w-4xl container">
                <button
                    className="md:hidden"
                    onClick={openMenu}
                    aria-label="Open menu"
                    >
                        <Icons icon="menu" />
                </button>

                <div className="mb-2 flex-1 md:flex-initial text-3xl font-bold">
                    sneakers
                </div>

                <Menu show={showMenu} onCloseClick={hideMenu} />

                <CartButton />

                <ProfilePhoto url={avatarImage} />
            </div>
        </header>
    )
}