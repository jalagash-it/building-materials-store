import { INestedLink } from './link'

export interface IMenuItem extends INestedLink {
    icon?: string;
}

export type IMenu = IMenuItem[];
