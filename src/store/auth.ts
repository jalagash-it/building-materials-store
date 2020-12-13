import IUser from '~/interfaces/user';
export interface AuthState {
    user: IUser
}

function getDefaultState(): AuthState {
    return {
        user: { email: '' }
    }
}
export const state = getDefaultState