export interface ICategoryDef {
    slug?: string;
    name: string;
    image?: string;
    items?: number;
    children?: ICategoryDef[];
}
