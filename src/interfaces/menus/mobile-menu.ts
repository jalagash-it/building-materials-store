import { INestedLink } from './link'

export interface IMobileMenuLink extends INestedLink {
    type: 'link' | 'button';
    data?: any;
}

export type IMobileMenu = IMobileMenuLink[];
