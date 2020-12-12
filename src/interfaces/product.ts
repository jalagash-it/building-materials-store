import { IBrand } from './brand'
import { IFilter } from './filter'
import { IFilterableList, IPaginatedList } from './list'
import { IShopCategory } from './category'

export interface IProductAttributeValue {
    slug: string;
    name: string;
}

export interface IProductAttribute {
    slug: string;
    name: string;
    values: IProductAttributeValue[];
    featured: boolean;
}

export interface IProduct {
    id: number;
    slug: string;
    name: string;
    images: string[];
    price: number;
    compareAtPrice: number | null;
    brand: IBrand | null;
    badges: string[];
    categories: IShopCategory[];
    reviews: number;
    rating: number;
    attributes: IProductAttribute[];
    availability: string;
}

export type IProductsList = IPaginatedList<IProduct> & IFilterableList<IProduct, IFilter>;
