import { ReactComponent as cartIcon } from '../../assets/images/icon-cart.svg'
import { ReactComponent as closeIcon } from '../../assets/images/icon-close.svg'
import { ReactComponent as deleteIcon } from '../../assets/images/icon-delete.svg'
import { ReactComponent as menuIcon } from '../../assets/images/icon-menu.svg'
import { ReactComponent as minusIcon } from '../../assets/images/icon-minus.svg'
import { ReactComponent as nextIcon } from '../../assets/images/icon-next.svg'
import { ReactComponent as plusIcon } from '../../assets/images/icon-plus.svg'
import { ReactComponent as previousIcon } from '../../assets/images/icon-previous.svg'

const icons = {
    cartIcon,
    closeIcon,
    deleteIcon,
    menuIcon,
    minusIcon,
    nextIcon,
    plusIcon,
    previousIcon,
}

export const Icons = ({icon, ...props}) => {
    const Element = icons[`${icon}Icon`]

    return <Element {...props} />
}