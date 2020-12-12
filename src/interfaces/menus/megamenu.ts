import { INestedLink } from './link'

export type IMegamenuSize = 'xl' | 'lg' | 'nl' | 'sm' | 'xs';

export type IMegamenuColumnSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface IMegamenuColumn {
    size: IMegamenuColumnSize;
    links: INestedLink[];
}

export interface IMegamenu {
    size: IMegamenuSize;
    image?: string | {
        ltr: string;
        rtl: string;
    };
    columns: IMegamenuColumn[];
}
