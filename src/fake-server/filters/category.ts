import {
    categoriesListData,
    categoriesTreeData,
    prepareCategory
} from '../database/categories'
import AbstractFilterBuilder from './abstract'
import { ICategoryFilter, ICategoryFilterValue } from '~/interfaces/filter'
import { IProduct } from '~/interfaces/product'
import { IShopCategory } from '~/interfaces/category'

export default class CategoryFilterBuilder extends AbstractFilterBuilder<ICategoryFilter> {
    value: ICategoryFilterValue = null;

    items: IShopCategory[] = [];

    test () {
        if (this.value === null) {
            return true
        }

        // return product.categories.reduce((acc, category) => (
        //     acc || category.slug === this.value
        // ), false);

        return true
    }

    makeItems (_: IProduct[], value?: string): void {
        this.value = value || null

        const category = categoriesListData.find(x => x.slug === value)
        // const categoryHasProductsFn = (x) => categoryHasProducts(x, productsData);
        const categoryHasProductsFn = () => true

        if (category) {
            this.items = [prepareCategory(category, 1)].map(x => ({
                ...x,
                children: x.children === undefined ? [] : x.children.filter(categoryHasProductsFn)
            }))
        } else {
            this.items = categoriesTreeData
                .map(x => prepareCategory(x))
                .filter(categoryHasProductsFn)
        }
    }

    // eslint-disable-next-line class-methods-use-this
    calc (): void {}

    build (): ICategoryFilter {
        return {
            type: 'category',
            slug: this.slug,
            name: this.name,
            items: this.items,
            value: this.value
        }
    }
}
