export interface IAttributeValueDef {
    name: string;
    slug: string;
}

export interface IAttributeDef {
    name: string;
    slug: string;
    values: IAttributeValueDef[];
}
