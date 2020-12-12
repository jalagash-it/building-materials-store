import { categoriesTreeData, categoriesListData, prepareCategory } from '../database/categories'
import { IShopCategory } from '~/interfaces/category'

export interface GetCategoriesOptions {
    depth?: number;
}

export interface GetCategoryBySlugOptions {
    depth?: number;
}

export function getCategories (options: GetCategoriesOptions = {}): Promise<IShopCategory[]> {
    return Promise.resolve(
        categoriesTreeData.map(x => prepareCategory(x, options.depth))
    )
}

export function getCategoryBySlug (slug: string, options: GetCategoryBySlugOptions = {}): Promise<IShopCategory> {
    const category = categoriesListData.find(x => x.slug === slug)

    return category ? Promise.resolve(prepareCategory(category, options.depth)) : Promise.reject(new Error())
}
