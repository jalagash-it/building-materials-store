export type IProductAttributeValuesDef = string | string[];

export interface IProductAttributeDef {
    slug: string;
    values: IProductAttributeValuesDef;
    featured?: boolean;
}

export type IProductImagesDef = string | string[];

export type IProductBadgesDef = string | string[];

export type IProductCategoriesDef = string | string[];

export interface IProductDef {
    slug?: string;
    name: string;
    price: number;
    compareAtPrice?: number | null;
    images?: IProductImagesDef;
    badges?: IProductBadgesDef;
    rating?: number;
    reviews?: number;
    availability?: 'in-stock';
    brand?: string;
    categories?: IProductCategoriesDef;
    attributes?: IProductAttributeDef[];
}
