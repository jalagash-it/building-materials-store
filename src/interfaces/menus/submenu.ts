import { IMenu } from './menu'
import { IMegamenu } from './megamenu'

export interface ISubmenuMenu {
    type: 'menu';
    menu: IMenu;
}

export interface ISubmenuMegamenu {
    type: 'megamenu';
    menu: IMegamenu;
}

export type ISubmenu = ISubmenuMenu | ISubmenuMegamenu;
