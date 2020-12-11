export interface IAddress {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    postcode: string;
    address: string;
}

export interface IUserAddress extends IAddress {
    id: number;
    default: boolean;
}
