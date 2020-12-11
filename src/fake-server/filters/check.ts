import productsData from '../database/products'
import AbstractFilterBuilder from './abstract'
import { IBaseFilterItem, ICheckFilter, ICheckFilterValue } from '~/interfaces/filter'
import { IProduct } from '~/interfaces/product'

function parseValue (value?: string): string[] {
    return value ? value.split(',') : []
}

export default class CheckFilterBuilder extends AbstractFilterBuilder<ICheckFilter> {
    items: IBaseFilterItem[] = [];

    value: ICheckFilterValue = [];

    test (product: IProduct): boolean {
        if (this.value.length === 0) {
            return true
        }

        return this.value.reduce<boolean>((result, value) => (
            result || this.extractItems(product).map(x => x.slug).includes(value)
        ), false)
    }

    makeItems (products: IProduct[], value?: string) {
        products.forEach(product => this.extractItems(product).forEach((item) => {
            if (!this.items.find(x => x.slug === item.slug)) {
                this.items.push(item)
            }
        }))

        this.value = parseValue(value)
    }

    calc (filters: AbstractFilterBuilder[]): void {
        const products = productsData.filter(
            product => filters.reduce<boolean>(
                (isMatched, filter) => (
                    isMatched && (filter === this || filter.test(product))
                ),
                true
            )
        )

        this.items = this.items.map((item) => {
            const count = products.reduce((acc, product) => (
                acc + (this.extractItems(product).map(x => x.slug).includes(item.slug) ? 1 : 0)
            ), 0)

            return { ...item, count }
        })
    }

    build (): ICheckFilter {
        return {
            type: 'check',
            slug: this.slug,
            name: this.name,
            items: this.items,
            value: this.value
        }
    }

    extractItems (product: IProduct): IBaseFilterItem[] {
        if (this.slug === 'brand') {
            return product.brand ? [{
                slug: product.brand.slug,
                name: product.brand.name,
                count: 0
            }] : []
        }

        throw new Error('Unknown slug')
    }
}
