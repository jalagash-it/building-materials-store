import { IProduct } from '~/interfaces/product'
import { IBaseFilter } from '~/interfaces/filter'

export default abstract class AbstractFilterBuilder<T extends IBaseFilter = IBaseFilter> {
    slug: string;

    name: string;

    constructor (slug: string, name: string) {
        this.slug = slug
        this.name = name
    }

    abstract test(product: IProduct): boolean;

    abstract makeItems(products: IProduct[], value?: string): void;

    abstract calc(filters: AbstractFilterBuilder[]): void;

    abstract build(): T;
}
