import { ICustomFields } from './custom-fields'

export interface IBaseCategory {
    type: string;
    id: number;
    slug: string;
    name: string;
    image?: string;
    items?: number;
    parent?: this;
    children?: this[];
    customFields: ICustomFields;
}

export interface IShopCategory extends IBaseCategory {
    type: 'shop';
}

export interface IBlogCategory extends IBaseCategory {
    type: 'blog';
}

export type ICategory = IShopCategory | IBlogCategory;
