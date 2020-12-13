export default interface IUser {
    id: number;
    email: string | null;
    token: string | null | undefined;
}