import { IBlogCategory } from '~/interfaces/category'

const dataBlogWidgetCategories: IBlogCategory[] = [
    {
        type: 'blog',
        id: 1,
        slug: 'latest-news',
        name: 'Latest News',
        customFields: {}
    },
    {
        type: 'blog',
        id: 2,
        slug: 'special-offers',
        name: 'Special Offers',
        customFields: {},
        children: [
            {
                type: 'blog',
                id: 3,
                slug: 'spring-sales',
                name: 'Spring Sales',
                customFields: {}
            },
            {
                type: 'blog',
                id: 4,
                slug: 'summer-sales',
                name: 'Summer Sales',
                customFields: {}
            },
            {
                type: 'blog',
                id: 5,
                slug: 'autumn-sales',
                name: 'Autumn Sales',
                customFields: {}
            },
            {
                type: 'blog',
                id: 6,
                slug: 'christmas-sales',
                name: 'Christmas Sales',
                customFields: {}
            },
            {
                type: 'blog',
                id: 7,
                slug: 'other-sales',
                name: 'Other Sales',
                customFields: {}
            }
        ]
    },
    {
        type: 'blog',
        id: 8,
        slug: 'new-arrivals',
        name: 'New Arrivals',
        customFields: {}
    },
    {
        type: 'blog',
        id: 9,
        slug: 'reviews',
        name: 'Reviews',
        customFields: {}
    },
    {
        type: 'blog',
        id: 10,
        slug: 'drills-and-mixers',
        name: 'Drills and Mixers',
        customFields: {}
    },
    {
        type: 'blog',
        id: 11,
        slug: 'cordless-screwdrivers',
        name: 'Cordless Screwdrivers',
        customFields: {}
    },
    {
        type: 'blog',
        id: 12,
        slug: 'screwdrivers',
        name: 'Screwdrivers',
        customFields: {}
    },
    {
        type: 'blog',
        id: 14,
        slug: 'wrenches',
        name: 'Wrenches',
        customFields: {}
    }
]

export default dataBlogWidgetCategories
