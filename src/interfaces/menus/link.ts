export interface ILink {
    title: string;
    url?: string;
    props?: {
        target?: '_blank';
    };
}

export interface INestedLink extends ILink {
    children?: this[];
}
