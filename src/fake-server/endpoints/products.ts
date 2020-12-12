import CategoryFilterBuilder from '../filters/category'
import CheckFilterBuilder from '../filters/check'
import ColorFilterBuilder from '../filters/color'
import productsData from '../database/products'
import RadioFilterBuilder from '../filters/radio'
import RangeFilterBuilder from '../filters/range'
import { IProduct, IProductsList } from '~/interfaces/product'

export interface GetProductsOptions {
    limit?: number;
    category?: string;
}

export interface GetProductsListOptions {
    page?: number;
    limit?: number;
    sort?: string;
}

export interface GetProductsListFilters {
    [filterSlug: string]: string;
}

export type GetSuggestionsOptions = {
    limit?: number;
    category?: string;
};

function getProducts (shift: number, options: GetProductsOptions): Promise<IProduct[]> {
    const limit = options.limit || 8
    let products = [...productsData.slice(shift), ...productsData.slice(0, shift)]

    if (options.category === 'power-tools') {
        products = products.slice().reverse()
    } else if (options.category === 'hand-tools') {
        products = [...products.slice(8), ...products.slice(0, 8)]
    } else if (options.category === 'plumbing') {
        products = [...products.slice(8), ...products.slice(0, 8)].reverse()
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.slice(0, limit))
        }, 500)
    })
}

export function getProductBySlug (slug: string) {
    const product = productsData.find(x => x.slug === slug)

    return product ? Promise.resolve(product) : Promise.reject(new Error())
}

export function getRelatedProducts (_: string, options: GetProductsOptions = {}) {
    const limit = options.limit || 8

    return Promise.resolve(productsData.slice(0, limit))
}

export function getProductsList (
    options: GetProductsListOptions = {},
    filterValues: GetProductsListFilters = {}
): Promise<IProductsList> {
    const filters = [
        new CategoryFilterBuilder('category', 'Categories'),
        new RangeFilterBuilder('price', 'Price'),
        new CheckFilterBuilder('brand', 'Brand'),
        new RadioFilterBuilder('discount', 'Discount'),
        new ColorFilterBuilder('color', 'Color')
    ]

    let items = productsData.slice(0)

    filters.forEach(filter => filter.makeItems(items, filterValues[filter.slug]))

    // Calculate items count for filter values.
    filters.forEach(filter => filter.calc(filters))

    // Apply filters to products list.
    items = items.filter(
        product => filters.reduce<boolean>((mr, filter) => mr && filter.test(product), true)
    )

    const page = options.page || 1
    const limit = options.limit || 12
    const sort = options.sort || 'default'
    const total = items.length
    const pages = Math.ceil(total / limit)
    const from = (page - 1) * limit + 1
    const to = Math.max(Math.min(page * limit, total), from)

    items = items.sort((a, b) => {
        if (['name_asc', 'name_desc'].includes(sort)) {
            if (a.name === b.name) {
                return 0
            }

            return (a.name > b.name ? 1 : -1) * (sort === 'name_asc' ? 1 : -1)
        }

        return 0
    })

    const start = (page - 1) * limit
    const end = start + limit

    items = items.slice(start, end)

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                page,
                limit,
                sort,
                total,
                pages,
                from,
                to,
                items,
                filters: filters.map(x => x.build())
            })
        }, 350)
    })
}

export function getFeaturedProducts (options = {}) {
    return getProducts(0, options)
}

export function getLatestProducts (options = {}) {
    return getProducts(0, options)
}

export function getTopRatedProducts (options = {}) {
    return getProducts(0, options)
}

export function getDiscountedProducts (options = {}) {
    return getProducts(3, options)
}

export function getPopularProducts (options = {}) {
    return getProducts(6, options)
}

export function getSuggestions (query: string, options: GetSuggestionsOptions) {
    const limit = options.limit || 5

    return Promise.resolve(
        productsData.filter(
            x => x.name.toLowerCase().includes(query.toLowerCase())
        ).slice(0, limit)
    )
}
