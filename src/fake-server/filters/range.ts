import productsData from '../database/products'
import AbstractFilterBuilder from './abstract'
import { IRangeFilter, IRangeFilterValue } from '~/interfaces/filter'
import { IProduct } from '~/interfaces/product'

function parseValue (value: string): IRangeFilterValue {
    return value.split('-').map(x => parseFloat(x)) as IRangeFilterValue
}

export default class RangeFilterBuilder extends AbstractFilterBuilder<IRangeFilter> {
    min: number = 0;

    max: number = 0;

    value: IRangeFilterValue = [0, 0];

    test (product: IProduct): boolean {
        const value = this.extractValue(product)

        return value >= this.value[0] && value <= this.value[1]
    }

    makeItems (_: IProduct[], value?: string): void {
        this.max = productsData.reduce(
            (acc, product) => Math.max(acc, this.extractValue(product)),
            0
        )
        this.min = productsData.reduce(
            (acc, product) => Math.min(acc, this.extractValue(product)),
            this.max
        )

        /** Calculates the number of digits for rounding. */
        let digit = Math.max(Math.ceil(this.max).toString().length - 2, 1)

        digit = 10 ** digit

        this.max = Math.ceil(this.max / digit) * digit
        this.min = Math.floor(this.min / digit) * digit
        this.value = [this.min, this.max]

        if (value) {
            this.value = parseValue(value)
        }
    }

    // eslint-disable-next-line class-methods-use-this
    calc () { }

    extractValue (product: IProduct): number {
        if (this.slug === 'price') {
            return product.price
        }

        throw new Error('Unknown slug')
    }

    build (): IRangeFilter {
        return {
            type: 'range',
            slug: this.slug,
            name: this.name,
            min: this.min,
            max: this.max,
            value: this.value
        }
    }
}
