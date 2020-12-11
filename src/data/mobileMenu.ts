import { IMobileMenu } from '~/interfaces/menus/mobile-menu'

const dataMobileMenu: IMobileMenu = [
    {
        type: 'link',
        title: 'Home',
        url: '/',
        children: [
            { type: 'link', title: 'Home 1', url: '/' },
            { type: 'link', title: 'Home 2', url: '/home-two' },
            { type: 'link', title: 'Offcanvas Cart', url: '/offcanvas-cart' }
        ]
    },

    {
        type: 'link',
        title: 'Categories',
        url: '',
        children: [
            {
                type: 'link',
                title: 'Power Tools',
                url: '',
                children: [
                    { type: 'link', title: 'Engravers', url: '' },
                    { type: 'link', title: 'Wrenches', url: '' },
                    { type: 'link', title: 'Wall Chaser', url: '' },
                    { type: 'link', title: 'Pneumatic Tools', url: '' }
                ]
            },
            {
                type: 'link',
                title: 'Machine Tools',
                url: '',
                children: [
                    { type: 'link', title: 'Thread Cutting', url: '' },
                    { type: 'link', title: 'Chip Blowers', url: '' },
                    { type: 'link', title: 'Sharpening Machines', url: '' },
                    { type: 'link', title: 'Pipe Cutters', url: '' },
                    { type: 'link', title: 'Slotting machines', url: '' },
                    { type: 'link', title: 'Lathes', url: '' }
                ]
            }
        ]
    },

    {
        type: 'link',
        title: 'Shop',
        url: '/shop/category-grid-3-columns-sidebar',
        children: [
            {
                type: 'link',
                title: 'Shop Grid',
                url: '/shop/category-grid-3-columns-sidebar',
                children: [
                    { type: 'link', title: '3 Columns Sidebar', url: '/shop/category-grid-3-columns-sidebar' },
                    { type: 'link', title: '4 Columns Full', url: '/shop/category-grid-4-columns-full' },
                    { type: 'link', title: '5 Columns Full', url: '/shop/category-grid-5-columns-full' }
                ]
            },
            { type: 'link', title: 'Shop List', url: '/shop/category-list' },
            { type: 'link', title: 'Shop Right Sidebar', url: '/shop/category-right-sidebar' },
            {
                type: 'link',
                title: 'Product',
                url: '/shop/product-standard',
                children: [
                    { type: 'link', title: 'Product', url: '/shop/product-standard' },
                    { type: 'link', title: 'Product Alt', url: '/shop/product-columnar' },
                    { type: 'link', title: 'Product Sidebar', url: '/shop/product-sidebar' }
                ]
            },
            { type: 'link', title: 'Cart', url: '/shop/cart' },
            { type: 'link', title: 'Checkout', url: '/shop/checkout' },
            { type: 'link', title: 'Order Success', url: '/shop/checkout/success' },
            { type: 'link', title: 'Wishlist', url: '/shop/wishlist' },
            { type: 'link', title: 'Compare', url: '/shop/compare' },
            { type: 'link', title: 'Track Order', url: '/shop/track-order' }
        ]
    },

    {
        type: 'link',
        title: 'Account',
        url: '/account',
        children: [
            { type: 'link', title: 'Login', url: '/account/login' },
            { type: 'link', title: 'Dashboard', url: '/account/dashboard' },
            { type: 'link', title: 'Edit Profile', url: '/account/profile' },
            { type: 'link', title: 'Order History', url: '/account/orders' },
            { type: 'link', title: 'Order Details', url: '/account/orders/5' },
            { type: 'link', title: 'Address Book', url: '/account/addresses' },
            { type: 'link', title: 'Edit Address', url: '/account/addresses/5' },
            { type: 'link', title: 'Change Password', url: '/account/password' }
        ]
    },

    {
        type: 'link',
        title: 'Blog',
        url: '/blog/category-classic',
        children: [
            { type: 'link', title: 'Blog Classic', url: '/blog/category-classic' },
            { type: 'link', title: 'Blog Grid', url: '/blog/category-grid' },
            { type: 'link', title: 'Blog List', url: '/blog/category-list' },
            { type: 'link', title: 'Blog Left Sidebar', url: '/blog/category-left-sidebar' },
            { type: 'link', title: 'Post Page', url: '/blog/post-classic' },
            { type: 'link', title: 'Post Without Sidebar', url: '/blog/post-full' }
        ]
    },

    {
        type: 'link',
        title: 'Pages',
        url: '/site/about-us',
        children: [
            { type: 'link', title: 'About Us', url: '/site/about-us' },
            { type: 'link', title: 'Contact Us', url: '/site/contact-us' },
            { type: 'link', title: 'Contact Us Alt', url: '/site/contact-us-alt' },
            { type: 'link', title: '404', url: '/site/not-found' },
            { type: 'link', title: 'Terms And Conditions', url: '/site/terms' },
            { type: 'link', title: 'FAQ', url: '/site/faq' },
            { type: 'link', title: 'Components', url: '/site/components' },
            { type: 'link', title: 'Typography', url: '/site/typography' }
        ]
    }
]

export default dataMobileMenu
