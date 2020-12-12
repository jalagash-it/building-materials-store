import { IProduct } from '~/interfaces/product'

export interface BlockProductColumnsItem {
    title: string;
    products: IProduct[];
}

export type BlogPagePostLayout = 'classic' | 'full'
export type BlogPagePostSidebarPosition = 'start' | 'end'

export interface BlockHeaderGroup {
    name: string;
    current: boolean;
}

export type PostCardLayout = 'grid-nl' | 'grid-lg' | 'list-nl' | 'list-sm'
