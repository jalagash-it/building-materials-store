import { ILink } from './link'
import { ISubmenu } from './submenu'

export interface INavLink extends ILink {
    submenu?: ISubmenu;
}

export type INav = INavLink[];
