import * as queryString from 'query-string'
import { ICategory } from '~/interfaces/category'
import { IFilterValues, IListOptions } from '~/interfaces/list'

export function getCategoryParents (category: ICategory): ICategory[] {
    return category.parent ? [...getCategoryParents(category.parent), category.parent] : []
}

export function isArrayOfStrings (value: any): value is string[] {
    if (!Array.isArray(value)) {
        return false
    }

    return !value.map(x => typeof x !== 'string').includes(true)
}

export function parseQueryOptions (query: string | queryString.ParsedQuery) {
    const queryObject = typeof query === 'string' ? queryString.parse(query) : query
    const optionValues: IListOptions = {}

    if (typeof queryObject.page === 'string') {
        optionValues.page = parseFloat(queryObject.page)
    }
    if (typeof queryObject.limit === 'string') {
        optionValues.limit = parseFloat(queryObject.limit)
    }
    if (typeof queryObject.sort === 'string') {
        optionValues.sort = queryObject.sort
    }

    return optionValues
}

export function parseQueryFilters (query: string | queryString.ParsedQuery) {
    const queryObject = typeof query === 'string' ? queryString.parse(query) : query
    const filterValues: IFilterValues = {}

    Object.keys(queryObject).forEach((param) => {
        const value = queryObject[param]
        const mr = param.match(/^filter_([-_A-Za-z0-9]+)$/)

        if (!mr || typeof value !== 'string') {
            return
        }

        const filterSlug = mr[1]

        filterValues[filterSlug] = value
    })

    return filterValues
}

export function buildQuery (options: IListOptions, filters: IFilterValues) {
    const params: { [key: string]: any } = {}

    if (options.page !== 1) {
        params.page = options.page
    }

    if (options.limit !== 12) {
        params.limit = options.limit
    }

    if (options.sort !== 'default') {
        params.sort = options.sort
    }

    Object.keys(filters).filter(x => x !== 'category' && !!filters[x]).forEach((filterSlug) => {
        params[`filter_${filterSlug}`] = filters[filterSlug]
    })

    return queryString.stringify(params, { encode: false })
}

export function runOnlyOnServer<T extends (...args: any[]) => any, D> (
    fn: T,
    defaultReturnValue: D
): ReturnType<T> | D {
    // @ts-ignore
    return process.server ? fn() : defaultReturnValue
}
