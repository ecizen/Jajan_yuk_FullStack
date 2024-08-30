import { faHome, faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import images from "./data-image"
import { faUser, faMessage, } from "@fortawesome/free-regular-svg-icons"

export const itemBottomNavgiation = [
    {id: 1, title: 'Home', icon: faHome, href : '/shop' },
    {id: 2, title: 'Search', icon: faSearch, href : '/shop/search' },
    {id: 3, title: 'Message', icon: faMessage, href : '/message' },
    {id: 4, title: 'Profile', icon: faUser, href : '/message' },
]