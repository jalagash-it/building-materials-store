export interface ISpecAttribute {
    name: string;
    value: string;
}

export interface ISpecGroup {
    name: string;
    attributes: ISpecAttribute[];
}

export type ISpec = ISpecGroup[];
